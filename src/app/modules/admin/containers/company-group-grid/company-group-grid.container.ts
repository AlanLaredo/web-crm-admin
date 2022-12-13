// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'

import { companyGroupsOperation } from 'src/app/shared/operations/queries'
import { deleteCompanyGroupOperation } from 'src/app/shared/operations/mutations'

@Component({
  templateUrl: './company-group-grid.container.html',
  styleUrls: ['./company-group-grid.container.scss']
})
export class CompanyGroupGridContainer implements OnInit {
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
    this.titleService.setTitle(this.translate.instant('submenu.company-group') + ' - ' + this.translate.instant('applicationTitle'))

    this.loadTranslations()
    this.loadData()
  }

  loadTranslations () {
    this.translate.stream('general').subscribe((cols) => {
      this.filterOptions = [
        { key: 'name', text: cols.name }
      ]
    })

    this.columns = this.filterOptions.map((col: any) => col.key)
    this.columns.push('actions')
  }

  loadData () {
    this.loading = true
    this.graphqlService.execute(companyGroupsOperation).then((result: any) => {
      this.loading = false
      this.data = result
      this.data.map((companyGroup: any) => {
        companyGroup.category = companyGroup.name
        return companyGroup
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
      this.graphqlService.execute(deleteCompanyGroupOperation, { id }).then(
        (result: any) => {
          this.loading = false
          this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
          this.loadData()
        }
      )
    }
  }
}
