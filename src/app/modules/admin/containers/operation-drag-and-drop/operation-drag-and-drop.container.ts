// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { MatDialog } from '@angular/material/dialog'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'

import { companiesForProcessOperation, processFunctionsOperation } from 'src/app/shared/operations/queries'
import { deleteProcessOperation, updateProcessOperation, createProcessOperation, updateCustomerOperation, createCustomerOperation, deleteCustomerOperation } from 'src/app/shared/operations/mutations'
import { LoginService } from 'src/app/modules/auth/services'
import { ProcessCustomerFormModalComponent, ProcessFormModalComponent } from '../../components'
import { DateTime } from 'luxon'
import { InputModalComponent } from 'src/app/shared/components/input-modal'

@Component({
  templateUrl: './operation-drag-and-drop.container.html',
  styleUrls: ['./operation-drag-and-drop.container.scss']
})
export class OperationDragAndDropContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  data: any[] = []
  processFunctions: any[] = []
  companies: any[] = []
  filteredData: any[] = []
  user: any
  newProcessId: string | null = null

  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private notifyService: NotifyService,
    private titleService: Title,
    private graphqlService: GraphqlService,
    private loginService: LoginService,
    private dialog: MatDialog
  ) {
    this.user = this.loginService.getUser()
  }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('submenu.process') + ' - ' + this.translate.instant('applicationTitle'))

    this.loadTranslations()
    this.loadData()
  }

  loadTranslations () {
  }

  async loadData () {
    this.loading = true
    const promises: Promise<any>[] = [
      this.graphqlService.execute(processFunctionsOperation),
      this.graphqlService.execute(companiesForProcessOperation)
    ]

    if (this.user.userRole.name !== 'CrmAdmin') {
      // promises.push(this.graphqlService.execute(companyOperation, this.user.companyId))
    } else {
      // promises.push(this.graphqlService.execute(companiesOperation))
    }

    this.loading = true
    const [processFunctions, companies] = await Promise.all(promises)
    this.loading = false

    this.processFunctions = processFunctions
    this.companies = companies
    this.formatData()
  }

  formatData () {
    this.companies = this.companies.map(company => {
      company.processList = company.processList.sort((a: any, b: any) => a.order - b.order)
      company.processList = company.processList.map((process: any) => {
        process.customers = process.customers.map((customer: any) => {
          customer.createdAtString = DateTime.fromJSDate(new Date(customer.createdAt)).setLocale(this.translate.instant('lang.luxon')).toFormat('DDD')

          const remindDate = DateTime.fromJSDate(new Date(customer.remindDate))
          if (customer.remindDate && remindDate > DateTime.now()) {
            customer.remindDateString = remindDate.setLocale(this.translate.instant('lang.luxon')).toFormat('DDDD \'a las \' hh:mm a')
          } else {
            customer.remindDateString = ''
          }
          return customer
        })
        return process
      })
      return company
    })
  }

  dragEnd ($event: any, customer: any, process: any) {
    const data = { ...customer }
    if (this.newProcessId) {
      data.processId = this.newProcessId
      this.saveCustomer(data)
    }
  }

  entered ($event: any) {
    this.newProcessId = $event.container.id
  }

  drop (event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }

  openProcessDialog (process: any = null) {
    const dialogRef = this.dialog.open(ProcessFormModalComponent, {
      width: '450px',
      data: {
        title: this.translate.instant('process.form'),
        process,
        processFunctions: this.processFunctions,
        companies: this.companies
      }
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveProcess(result)
      }
    })
  }

  openCustomerDialog (process: any, clients: any[], customer: any = null) {
    const dialogRef = this.dialog.open(ProcessCustomerFormModalComponent, {
      maxWidth: '750px',
      data: {
        title: this.translate.instant('process.form'),
        customer,
        clients,
        process
      }
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveCustomer(result)
      }
    })
  }

  openRemindDialog (customer: any) {
    const deleteButton = [{
      name: this.translate.instant('process.deleteRemindDate'),
      action: 'submitAsNull',
      matType: 'mat-raised-button',
      color: 'warn'
    }]

    const dialogRef = this.dialog.open(InputModalComponent, {
      width: '400px',
      disableClose: true,
      data: {
        title: this.translate.instant('process.remind'),
        inputName: this.translate.instant('process.date'),
        instructions: this.translate.instant('form.instructions.selectADate'),
        info: this.translate.instant('process.infoRemind'),
        required: true,
        type: 'datetime-local',
        value: customer.remindDate,
        aditionalButtons: customer.remindDate ? deleteButton : []
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result || result === null) {
        const remindDate = DateTime.fromISO(result).toJSDate()
        this.saveCustomer({ id: customer.id, remindDate })
      }
    })
  }

  saveProcess (process: any) {
    const data = process
    this.loading = true
    this.graphqlService.execute(data.id ? updateProcessOperation : createProcessOperation, data).then(
      (response: any) => {
        this.loading = false
        if (!response.id) {
          this.notifyService.notify(this.translate.instant('messages.save.success'), 'success')
        } else {
          this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
        }
        this.loadData()
      },
      () => {
        this.notifyService.notify(this.translate.instant('messages.update.error'), 'error')
        this.loading = false
      }
    )
  }

  async saveCustomer (data: any) {
    this.loading = true
    delete data.createdAtString
    delete data.createdAt
    this.graphqlService.execute(data.id ? updateCustomerOperation : createCustomerOperation, data).then(
      (response: any) => {
        this.loading = false
        if (!data.id) {
          this.notifyService.notify(this.translate.instant('messages.save.success'), 'success')
        } else {
          this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
        }
        this.loadData()
        this.newProcessId = null
      },
      () => {
        this.notifyService.notify(this.translate.instant('messages.update.error'), 'error')
        this.loading = false
      }
    )
  }

  setDataFiltered (filteredData: any) {
    this.filteredData = filteredData
  }

  async delete (id: any) {
    const confirm = await this.notifyService.deleteConfirm()
    if (confirm) {
      this.loading = true
      this.graphqlService.execute(deleteProcessOperation, { id }).then(
        (result: any) => {
          this.loading = false
          this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
          this.loadData()
        }
      )
    }
  }

  async deleteCustomer (id: any) {
    const confirm = await this.notifyService.deleteConfirm()
    if (confirm) {
      this.loading = true
      this.graphqlService.execute(deleteCustomerOperation, { id }).then(
        (result: any) => {
          this.loading = false
          this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
          this.loadData()
        }
      )
    }
  }
}
