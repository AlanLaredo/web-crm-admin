/* eslint-disable no-useless-constructor */
// Third Party
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

import { Component, Input, Output, ViewChild, EventEmitter, AfterViewInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'

import { IGeneralGridColumn } from '../../models/data'

@Component({
  selector: 'general-catalog-grid-component',
  templateUrl: './general-catalog-grid.component.html',
  styleUrls: ['./general-catalog-grid.component.scss']
})
export class GeneralCatalogGridComponent implements AfterViewInit {
  @Input('data')
  set data (data: any[]) {
    if (data !== null) {
      this._data = data
      this.loadData()
    }
  }

  @Input('columns')
  set columns (columns: IGeneralGridColumn[]) {
    if (columns !== null) {
      this._columns = columns
      this.displayedColumns = this._columns.map(column => column.id)
      this.updateElements()
    }
  }

  @Input('viewServices')
  set viewServices (viewServices: any) {
    this._viewServices = viewServices
  }

  @Output()
  outActionDelete: EventEmitter<string> = new EventEmitter<string>()

  _data: any[] = []

  _columns: IGeneralGridColumn[] = [{
    id: 'name',
    name: 'catalogs.cols.name'
  }, {
    id: 'description',
    name: 'catalogs.cols.description'
  }, {
    id: 'actions',
    name: 'catalogs.cols.actions'
  }]

  displayedColumns: string[] = this._columns.map(column => column.id)
  _viewServices: boolean = false
  dataSource: any

  @ViewChild(MatPaginator) paginator: any
  @ViewChild(MatSort) sort: any

  constructor (
    public translate: TranslateService
  ) {
  }

  ngAfterViewInit (): void {
    this.updateElements()
  }

  loadData () {
    this.dataSource = new MatTableDataSource<any>(this._data)
    this.updateElements()
  }

  updateElements () {
    if (this.paginator !== undefined) {
      this.paginator._intl.itemsPerPageLabel = this.translate.instant('matTable.paginator.perPage')

      this.dataSource.paginator = this.paginator
    }
    if (this.sort !== undefined) {
      this.dataSource.sort = this.sort
    }
  }

  delete (id: string) {
    this.outActionDelete.emit(id)
  }
}
