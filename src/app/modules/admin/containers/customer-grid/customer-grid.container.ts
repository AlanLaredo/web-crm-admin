// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'

import { customersOperation } from 'src/app/shared/operations/queries'
import { createCustomerOperation, deleteCustomerOperation, updateCustomerOperation } from 'src/app/shared/operations/mutations'
import { ActivatedRoute, Router } from '@angular/router'
import { DateTime } from 'luxon'
import { LoginService } from 'src/app/modules/auth/services'

@Component({
  templateUrl: './customer-grid.container.html',
  styleUrls: ['./customer-grid.container.scss']
})
export class CustomerGridContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  data: any[] = []
  filteredData: any[] = []
  columns: any[] = []
  clientId: string = ''
  buttons: any[] = [
    {
      name: 'actions.delete',
      color: 'warn',
      icon: {
        type: 'mat-icon',
        name: 'delete_forever'
      },
      callback: (row: any) => this.delete(row.id)
    }
  ]

  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private notifyService: NotifyService,
    private titleService: Title,
    private graphqlService: GraphqlService,
    private activatedRoute: ActivatedRoute,
    public loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('submenu.customer') + ' - ' + this.translate.instant('applicationTitle'))
    const params = this.activatedRoute.snapshot.params
    this.loadTranslations()
    this.clientId = params.elementId
    this.loadData()
  }

  loadData () {
    this.loading = true
    this.graphqlService.execute(customersOperation, { clientId: this.clientId }).then((result: any) => {
      this.loading = false
      const user: any = this.loginService.getUser()
      const customers = result.filter((customer: any) => customer.createdBy === user._id)
      this.data = customers.map((customer: any) => {
        customer.contactName = customer.contact ? customer.contact.name + ' ' + (customer.contact.lastName ? customer.contact.lastName : '') : 'N/A'
        customer.contactPhoneContacts = customer.contact && customer.contact.phoneContacts && customer.contact.phoneContacts[0] ? customer.contact.phoneContacts[0] : 'N/A'
        customer.contactEmails = customer.contact && customer.contact.emails && customer.contact.emails[0] ? customer.contact.emails[0] : 'N/A'
        customer.attemptClosingDateString = customer.attemptClosingDate ? DateTime.fromJSDate(new Date(customer.attemptClosingDate)).setLocale(this.translate.instant('lang.luxon')).toFormat('DDDD') : 'N/A'
        customer.clientName = customer.client ? customer.client.businessName : 'N/A'
        customer.catalogPriorityName = !customer.catalogPriority ? 'Baja' : customer.catalogPriority === 1 ? 'Media' : 'Alta'
        customer.processName = customer.process.name
        return customer
      })
      this.setDataFiltered(this.data)
    })
  }

  setDataFiltered (filteredData: any) {
    this.filteredData = filteredData
  }

  async delete (id: any) {
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

  loadTranslations () {
    this.filterOptions = [
      {
        key: 'commercialValue',
        text: this.translate.instant('customer.commercialValue')
      },
      {
        key: 'attemptClosingDateString',
        text: this.translate.instant('customer.attemptClosingDate')
      },
      {
        key: 'clientName',
        text: this.translate.instant('customer.client')
      },
      {
        key: 'customerName',
        text: this.translate.instant('customer.customerName')
      },
      {
        key: 'processName',
        text: this.translate.instant('customer.process')
      },
      {
        key: 'catalogPriorityName',
        text: this.translate.instant('customer.catalogPriority')
      },
      // {
      //   key: 'attachedQuotePath',
      //   text: this.translate.instant('customer.attachedQuotePath')
      // },
      {
        key: 'comments',
        text: this.translate.instant('customer.comments')
      },
      {
        key: 'contactName',
        text: this.translate.instant('customer.contactName')
      },
      {
        key: 'contactPhoneContacts',
        text: this.translate.instant('customer.contactPhoneContacts')
      },
      {
        key: 'contactEmails',
        text: this.translate.instant('customer.contactEmails')
      }
    ]

    this.columns = this.filterOptions.map((column: any) => {
      column.key = column.key
      column.display = column.text
      column.type = 'text'
      return column
    })

    this.columns.push({
      key: 'actions',
      display: this.translate.instant('general.actions')
    })
  }

  async unhide (row: any) {
    const { id } = row
    if (await this.notifyService.confirm(this.translate.instant('messages.unhide.confirmQuestion'))) {
      this.saveCustomer({ id, hidden: true })
    }
  }

  async saveCustomer (data: any) {
    this.loading = true
    delete data.createdAtString
    delete data.createdAt
    delete data.remindDateString
    this.graphqlService.execute(updateCustomerOperation, data).then(
      (response: any) => {
        this.loading = false
        if (!data.id) {
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

  catchAction ($event: any) {
    const { button, row } = $event
    this.buttons.find(btn => btn.name === button).callback(row)

  }
}
