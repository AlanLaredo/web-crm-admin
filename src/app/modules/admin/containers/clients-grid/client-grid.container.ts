// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'

import { clientsOperation } from 'src/app/shared/operations/queries'
import { deleteClientOperation } from 'src/app/shared/operations/mutations'
import { IGeneralGridColumn } from '../../models/data'
import { LoginService } from 'src/app/modules/auth/services'

@Component({
  templateUrl: './client-grid.container.html',
  styleUrls: ['./client-grid.container.scss']
})
export class ClientGridContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  data: any[] = []
  filteredData: any[] = []
  columns: IGeneralGridColumn[] = []
  roleAccessName: any
  actions: any

  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private notifyService: NotifyService,
    private titleService: Title,
    private loginService: LoginService,
    private graphqlService: GraphqlService
  ) { }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('submenu.clients') + ' - ' + this.translate.instant('applicationTitle'))
    const user: any = this.loginService.getUser()
    this.roleAccessName = user.userRole?.name || ''

    this.loadTranslations()
    this.loadData()
  }

  loadTranslations () {
    this.filterOptions = [{
      key: 'keycode',
      text: this.translate.instant('client.keycode')
    }, {
      key: 'rfc',
      text: this.translate.instant('client.rfc')
    }, {
      key: 'businessName',
      text: this.translate.instant('client.businessName')
    }, {
      key: 'businessReason',
      text: this.translate.instant('client.businessReason')
    }, {
      key: 'legalRepresentativeContactFullName',
      text: this.translate.instant('person.legalRepresentative')
    }, {
      key: 'legalRepresentativeContactFullNamePhoneContact',
      text: this.translate.instant('person.phoneContacts')
    }]
    if (this.roleAccessName === 'CrmAdmin') {
      this.filterOptions.unshift({
        key: 'comanyName',
        text: this.translate.instant('client.company')
      })
    }

    this.columns = this.filterOptions.map((column: any) => {
      column.id = column.key
      column.name = column.text
      return column
    })
    this.columns.push({
      id: 'actions',
      name: this.translate.instant('general.actions')
    })
  }

  loadData () {
    this.loading = true
    this.graphqlService.execute(clientsOperation).then((result: any) => {
      this.loading = false
      this.data = []
      result.forEach((client: any) => {
        const dataDomain: any = {}
        dataDomain.id = client.id
        dataDomain.keycode = client.keycode
        dataDomain.rfc = client.rfc?.toUpperCase()
        dataDomain.businessName = client.businessName?.charAt(0).toUpperCase() + client.businessName?.slice(1)
        dataDomain.businessReason = client.businessReason?.charAt(0).toUpperCase() + client.businessReason?.slice(1) || ''
        dataDomain.legalRepresentativeContactFullName = client.legalRepresentativeContact?.name
        dataDomain.legalRepresentativeContactFullNamePhoneContact = client.legalRepresentativeContact?.phoneContacts[0] || 'N/A'
        dataDomain.comanyName = client.company.name
        this.data.push(dataDomain)
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
      this.graphqlService.execute(deleteClientOperation, { id }).then(
        (result: any) => {
          this.loading = false
          this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
          this.loadData()
        }
      )
    }
  }
}
