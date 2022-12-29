// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { MatDialog } from '@angular/material/dialog'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import * as fileSaver from 'file-saver'
import { v4 as uuidv4 } from 'uuid'
import { Router } from '@angular/router'
import { DateTime } from 'luxon'

import { companiesForProcessOperation, processFunctionsOperation } from 'src/app/shared/operations/queries'
import { deleteProcessOperation, updateProcessOperation, createProcessOperation, updateCustomerOperation, createCustomerOperation, deleteCustomerOperation } from 'src/app/shared/operations/mutations'
import { LoginService } from 'src/app/modules/auth/services'
import { ProcessCustomerFormModalComponent, ProcessFormModalComponent } from '../../components'
import { InputModalComponent } from 'src/app/shared/components/input-modal'
import { InputChipModalComponent } from 'src/app/shared/components'
import { AwsFileService } from '../../services'
import Swal from 'sweetalert2'

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
    private router: Router,
    private dialog: MatDialog,
    private awsFileService: AwsFileService
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
        process.customers = process.customers.filter((element: any) => !element.hidden)
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

  getProcessList (): any[] {
    return this.companies.map(company => company.processList).reduce((a, b) => [...a, ...b])
  }

  async openDialogEmails (): Promise<string[]> {
    const dialogRef = this.dialog.open(InputChipModalComponent, {
      width: '700px',
      disableClose: true,
      data: {
        title: this.translate.instant('process.emails'),
        inputName: this.translate.instant('process.recipients'), // destinatarios
        instructions: this.translate.instant('form.instructions.enterAEmail'),
        info: this.translate.instant('process.changeProcessDescription'),
        required: true,
        value: []
      }
    })
    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe(result => {
        resolve(result)
      })
    })
  }

  processIsValid (newProcessId: string, originalId: string): boolean {
    let result = false
    const processListIndex = this.getProcessList().map((p, i) => ({ id: p.id, i }))

    const originalProcess = processListIndex.find((p) => p.id === originalId)
    const newProcess = processListIndex.find((p) => p.id === newProcessId)
    if (originalProcess && newProcess) {
      const min = originalProcess.i - 1
      const max = originalProcess.i + 1
      if (newProcess.i === min || newProcess.i === max) {
        result = true
      }
    }
    return result
  }

  async dragEnd ($event: any, customer: any, process: any) {
    if (!this.newProcessId || !this.processIsValid(this.newProcessId, customer.processId)) {
      this.newProcessId = null
      this.loadData()
      return
    }
    const data = { ...customer }
    if (this.newProcessId) {
      data.processId = this.newProcessId
      const processList = this.getProcessList()
      const process = processList.find((element: any) => element.id === this.newProcessId)

      if (process.functions.find((element: any) => element.key === 'send-email')) {
        const emails: string[] = await this.openDialogEmails()
        if (emails && emails.length > 0) {
          data.emails = emails
        }
      }
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
    if (this.loading) {
      return
    }
    const dialogRef = this.dialog.open(ProcessCustomerFormModalComponent, {
      maxWidth: '750px',
      data: {
        title: this.translate.instant('process.form'),
        customer,
        clients,
        process,
        disabled: this.checkCreateClient(process)
      }
    })
    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        if (result.selectedFiles) {
          this.loading = true
          result.selectedFiles = result.selectedFiles.map((file: any) => {
            return new File([file], (uuidv4() + '_' + file.name), { type: file.type })
          })
          const awsFiles = await this.uploadAws(result.selectedFiles)

          if (awsFiles && awsFiles.length > 0) {
            result.attachedQuotePath = awsFiles.map(file => file.key)
          }
          delete result.selectedFiles
        }
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
    delete data.remindDateString
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
    if (await this.notifyService.deleteConfirm()) {
      const process = this.getProcessList().find(element => element.id === id)
      if (process.customers && process.customers.length > 0 && !await this.notifyService.confirm(this.translate.instant('process.confirmDeleteExistsCustomers'), 'warning')) {
        return
      }

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

  async hideCustomer (id: any) {
    if (await this.notifyService.confirm(this.translate.instant('messages.hide.confirmQuestion'))) {
      this.saveCustomer({ id, hidden: true })
    }
  }

  async removeFile ($event: any) {
    const id = $event.id
    if (await this.notifyService.deleteConfirm()) {
      this.loading = true
      this.awsFileService.delete($event.externalName)
    }
  }

  async uploadAws (selectedFiles: any[]): Promise<any[]> {
    return await Promise.all(selectedFiles.map(file => this.awsFileService.uploadFile(file, 'quotes')))
  }

  download ($event: any) {
    const path: string = $event
    const name = path.substring(path.lastIndexOf('/') + 1)
    this.awsFileService.getBlob(path).then((result: any) => {
      const blobFile = new window.Blob([new Uint8Array([...result]).buffer])
      fileSaver.saveAs(blobFile, name)
    })
  }

  view ($event: any) {
    const path: string = $event
    this.awsFileService.getSignedUrl(path).subscribe((result: any) => {
      window.open(result)
    })
  }

  isDragable (process: any, customer: any): boolean {
    let isDragable = false
    const requireQuote = process.functions.find((f: any) => f.key === 'quote-required')
    if (!requireQuote) {
      isDragable = true
    } else {
      if (customer.attachedQuotePath && customer.attachedQuotePath.length > 0) {
        isDragable = true
      }
    }
    return isDragable
  }

  checkCreateClient (process: any): boolean {
    return (process.functions || []).find((p: any) => p.key === 'register-client-from-customer-to-client')
  }

  openClientForm (customer: any) {
    if (!customer.attachedQuotePath || customer.attachedQuotePath.length === 0) {
      Swal.fire({ icon: 'warning', title: this.translate.instant('process.requireQuote'), text: this.translate.instant('process.requireQuoteInstruction') }).then()
      return
    }
    if (customer.clientId) {
      this.router.navigate(['admin/process/process/customer/' + customer.id + '/client/' + customer.clientId + '/edit'])
    } else {
      this.router.navigate(['admin/process/process/customer/' + customer.id + '/client/create'])
    }
  }

  openClientServiceForm (customer: any) {
    if (!customer.attachedQuotePath || customer.attachedQuotePath.length === 0) {
      Swal.fire({ icon: 'warning', title: this.translate.instant('process.requireQuote'), text: this.translate.instant('process.requireQuoteInstruction') }).then()
      return
    }
    if (customer.clientServiceId) {
      this.router.navigate(['admin/process/process/customer/' + customer.id + '/clientService/' + customer.clientServiceId + '/edit'])
    } else {
      this.router.navigate(['admin/process/process/customer/' + customer.id + '/clientService/create'])
    }
  }
}
