// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'

import { productManagementsOperation } from 'src/app/shared/operations/queries'
import { deleteProductManagementOperation } from 'src/app/shared/operations/mutations'

@Component({
  templateUrl: './product-management-grid.container.html',
  styleUrls: ['./product-management-grid.container.scss']
})
export class ProductManagementGridContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  data: any[] = []
  filteredData: any[] = []
  columns: any[] = []

  /* eslint-disable no-useless-constructor */
  // TODO: Revisar si realmente necesito el notifyService
  constructor (
    private translate: TranslateService,
    private notifyService: NotifyService,
    private titleService: Title,
    private graphqlService: GraphqlService
  ) { }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('submenu.products') + ' - ' + this.translate.instant('applicationTitle'))

    this.loadTranslations()
    this.loadData()
  }

  loadTranslations () {
    this.translate.stream('productsManagement').subscribe((cols) => {
      this.filterOptions = [
        { key: 'keycode', text: cols.keycode },
        { key: 'name', text: cols.name },
        { key: 'description', text: cols.description },
        { key: 'reorderPoint', text: cols.reorderPoint },
        { key: 'unitCost', text: cols.unitCost }
      ]
    })

    this.columns = this.filterOptions.map((column: any) => {
      column.id = column.key
      column.name = column.text
      column.type = column.key === 'unitCost' ? 'money' : 'text'
      return column
    })

    this.columns.push({
      id: 'actions',
      name: this.translate.instant('general.actions'),
      type: 'text'
    })
  }

  loadData () {
    this.loading = true
    this.graphqlService.execute(productManagementsOperation).then((result: any) => {
      this.loading = false
      this.data = result
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
      this.graphqlService.execute(deleteProductManagementOperation, { id }).then(
        (result: any) => {
          this.loading = false
          this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
          this.loadData()
        }
      )
    }
  }
}
