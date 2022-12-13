// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'

import { userRolesOperation } from 'src/app/shared/operations/queries'
import { deleteUserRoleOperation } from 'src/app/shared/operations/mutations'

@Component({
  templateUrl: './user-role-grid.container.html',
  styleUrls: ['./user-role-grid.container.scss']
})
export class UserRoleGridContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  data: any[] = []
  filteredData: any[] = []
  columns: string[] = []

  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private notifyService: NotifyService,
    private titleService: Title,
    private graphqlService: GraphqlService
  ) { }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('submenu.userRole') + ' - ' + this.translate.instant('applicationTitle'))

    this.loadTranslations()
    this.loadData()
  }

  loadTranslations () {
    this.translate.stream('general').subscribe((cols) => {
      this.filterOptions = [
        { key: 'name', text: cols.name },
        { key: 'description', text: cols.description }
      ]
    })

    this.columns = this.filterOptions.map((col: any) => col.key)
    this.columns.push('actions')
  }

  loadData () {
    this.loading = true
    this.graphqlService.execute(userRolesOperation).then((result: any) => {
      this.loading = false
      this.data = result
      this.data.map((userRole: any) => {
        userRole.category = userRole.name
        return userRole
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
      this.graphqlService.execute(deleteUserRoleOperation, { id }).then(
        (result: any) => {
          this.loading = false
          this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
          this.loadData()
        }
      )
    }
  }
}
