// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'

import { productManagementsOperation } from 'src/app/shared/operations/queries'
import { deleteProductManagementOperation, createProductManagementOperation, updateProductManagementOperation } from 'src/app/shared/operations/mutations'
import Swal from 'sweetalert2'

@Component({
  templateUrl: './product-management-stock.container.html',
  styleUrls: ['./product-management-stock.container.scss']
})
export class ProductManagementStockContainer implements OnInit {
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
    this.titleService.setTitle(this.translate.instant('productsManagement.itemsInStock') + ' - ' + this.translate.instant('applicationTitle'))

    this.loadTranslations()
    this.loadData()
  }

  loadTranslations () {
    this.translate.stream('productsManagement').subscribe((cols) => {
      this.filterOptions = [
        { key: 'keycode', text: cols.keycode },
        { key: 'name', text: cols.name },
        // { key: 'description', text: cols.description },
        { key: 'reorderPoint', text: cols.reorderPoint },
        { key: 'unitCost', text: cols.unitCost },
        { key: 'itemsInStock', text: cols.itemsInStock },
        { key: 'totalValue', text: cols.totalValue }
      ]
    })

    this.columns = this.filterOptions.map((column: any) => {
      column.key = column.key
      column.display = column.text
      column.type = ['unitCost', 'totalValue'].includes(column.key) ? 'money' : column.key === 'itemsInStock' ? 'number' : 'text'
      column.editable = column.key === 'itemsInStock'
      column.plusButton = column.key === 'itemsInStock'
      column.restButton = column.key === 'itemsInStock'
      return column
    })

    // this.columns.push({
    //   key: 'actions',
    //   display: this.translate.instant('general.actions'),
    //   type: 'text'
    // })
  }

  loadData () {
    this.loading = true
    this.graphqlService.execute(productManagementsOperation).then((result: any) => {
      this.loading = false
      this.data = this.processData(result)
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

  processData (data: any) {
    return data.map((element: any) => {
      element.totalValue = (element.unitCost || 0) * (element.itemsInStock || 0)
      return element
    })
  }

  saveRow ($event: any) {
    const { id, keyColumn, newValue } = $event
    const saveObject: any = {
      id
    }
    saveObject[keyColumn] = newValue
    this.save(saveObject)
  }

  async save ($event: any) {
    const data = $event
    // this.loading = true

    this.graphqlService.execute(data.id ? updateProductManagementOperation : createProductManagementOperation, data).then(
      (response: any) => {
        this.data = this.data.map(element => {
          if (element.id === response.id) {
            element = response
            element.totalValue = (element.unitCost || 0) * (element.itemsInStock || 0)
          }
          return element
        })

        this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
      },
      () => {
        this.notifyService.notify(this.translate.instant('messages.update.error'), 'error')
      }
    )
  }
}
