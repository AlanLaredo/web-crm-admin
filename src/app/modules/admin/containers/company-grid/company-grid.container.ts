// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'

import { companiesOperation } from 'src/app/shared/operations/queries'
import { deleteCompanyOperation } from 'src/app/shared/operations/mutations'

@Component({
  templateUrl: './company-grid.container.html',
  styleUrls: ['./company-grid.container.scss']
})
export class CompanyGridContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  data: any[] = []
  filteredData: any[] = []
  columns: string[] = []

  /* eslint-disable no-useless-constructor */
  // TODO: Revisar si realmente necesito el notifyService
  constructor (
    private translate: TranslateService,
    private notifyService: NotifyService,
    private titleService: Title,
    private graphqlService: GraphqlService
  ) { }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('submenu.company') + ' - ' + this.translate.instant('applicationTitle'))

    this.loadTranslations()
    this.loadData()
  }

  loadTranslations () {
    this.translate.stream('companyModule').subscribe((cols) => {
      this.filterOptions = [
        { key: 'name', text: cols.name },
        { key: 'parent', text: cols.parent },
        { key: 'group', text: cols.group }
      ]
    })

    this.columns = this.filterOptions.map((col: any) => col.key)
    this.columns.push('actions')
  }

  loadData () {
    this.loading = true
    this.graphqlService.execute(companiesOperation).then((result: any) => {
      this.loading = false
      this.data = result
      this.data.map((company: any) => {
        if (company.companyParent) {
          company.parent = company.companyParent.name
        }
        if (company.companyGroup) {
          company.group = company.companyGroup.name
        }
        return company
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
      this.graphqlService.execute(deleteCompanyOperation, { id }).then(
        (result: any) => {
          this.loading = false
          this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
          this.loadData()
        }
      )
    }
  }
}
