// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'

import { positionsOperation } from 'src/app/shared/operations/queries'
import { deletePositionOperation } from 'src/app/shared/operations/mutations'
import { LoginService } from 'src/app/modules/auth/services'

@Component({
  templateUrl: './position-grid.container.html',
  styleUrls: ['./position-grid.container.scss']
})
export class PositionGridContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  data: any[] = []
  filteredData: any[] = []
  columns: any[] = []
  user: any
  permissions: any = {
    edit: false,
    delete: false
  }

  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private notifyService: NotifyService,
    private titleService: Title,
    private graphqlService: GraphqlService,
    private loginService: LoginService
  ) {
    const permissions = this.loginService.getPermissions()
    this.permissions.edit = permissions.includes('positions.set')
    this.permissions.delete = permissions.includes('positions.delete')

    this.user = this.loginService.getUser()
  }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('submenu.position') + ' - ' + this.translate.instant('applicationTitle'))

    this.loadTranslations()
    this.loadData()
  }

  loadTranslations () {
    this.filterOptions = [
      { key: 'name', text: this.translate.instant('position.name') },
      { key: 'clientName', text: this.translate.instant('position.clientName') },
      { key: 'salary', text: this.translate.instant('position.salary') }
    ]

    if (this.user.userRole.name === 'CrmAdmin') {
      this.filterOptions.unshift({
        key: 'companyName',
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
    this.graphqlService.execute(positionsOperation).then((result: any) => {
      this.loading = false
      this.data = result
      this.data.map((position: any) => {
        position.companyName = position.client.company.name
        position.clientName = position.client.businessName
        return position
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
      this.graphqlService.execute(deletePositionOperation, { id }).then(
        (result: any) => {
          this.loading = false
          this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
          this.loadData()
        }
      )
    }
  }
}
