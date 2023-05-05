/* eslint-disable no-useless-constructor */
// Third Party
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

import { Component, Input, Output, ViewChild, EventEmitter, AfterViewInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'

import { IGenericGridColumn } from '../../models/data'
import { InputModalComponent } from 'src/app/shared/components/input-modal'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'generic-grid-component',
  templateUrl: './generic-grid.component.html',
  styleUrls: ['./generic-grid.component.scss']
})
export class GenericGridComponent implements AfterViewInit {
  @Input('data')
  set data (data: any[]) {
    if (data !== null) {
      this._data = data
      this.loadData()
    }
  }

  @Input('columns')
  set columns (columns: IGenericGridColumn[]) {
    if (columns !== null) {
      this._columns = columns
      this.displayedColumns = this._columns.map(column => column.key)
      this.updateElements()
    }
  }

  @Input('viewServices')
  set viewServices (viewServices: any) {
    this._viewServices = viewServices
  }

  @Input('permissions')
  set permissions (permissions: any) {
    this._permissions.edit = permissions && permissions.edit !== undefined ? permissions.edit : false
    this._permissions.delete = permissions && permissions.delete !== undefined ? permissions.delete : false
  }

  @Output()
  outActionDelete: EventEmitter<string> = new EventEmitter<string>()

  @Output()
  outActionColumnEdit: EventEmitter<any> = new EventEmitter<any>()

  _data: any[] = [
    {
      key: 'name',
      display: 'catalogs.cols.name',
      type: 'text'
    }
  ]
  _permissions: any = {
    edit: true,
    delete: true
  }

  _columns: IGenericGridColumn[] = []

  displayedColumns: string[] = this._columns.map(column => column.key)
  _viewServices: boolean = false
  dataSource: any

  @ViewChild(MatPaginator) paginator: any
  @ViewChild(MatSort) sort: any

  constructor (
    public translate: TranslateService,
    private dialog: MatDialog
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

  async openDialogEdit (keyColumn: any, row: any) {
    const column: any = this._columns.find(column => column.key === keyColumn)
    const data: any = {}

    data.title = this.translate.instant('actions.edit')
    data.inputName = column.display
    data.instructions = this.translate.instant('form.instructions.editValue')
    // data.info = this.translate.instant('operationBinnacle.infoHours')

    data.required = false
    data.type = column.type === 'money' || column.type === 'number'
    ? 'number'
    : 'text'

    data.value = column.type === 'money' || column.type === 'number'
      ? Number(row[column.key] || 0)
      : row[column.key]

      const dialog = this.dialog.open(InputModalComponent, {
      width: '400px',
      disableClose: false,
      data
    })

    let result = await dialog.afterClosed().toPromise()
    if (result !== undefined) {
      result = column.type === 'money' || column.type === 'number'
      ? Number(result || 0)
      : result

      this.outActionColumnEdit.emit({
        id: row.id,
        keyColumn,
        newValue: result ? result : null,
        oldValue: row[column.key]
      })
    }
  }

  shouldHighlight(row: any): boolean {
    return row.itemsInStock <= row.reorderPoint
  }
}
