/* eslint-disable no-useless-constructor */
// Third Party
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

import { Component, Input, Output, ViewChild, EventEmitter, AfterViewInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'

import { DateTime } from 'luxon'
import { LoginService } from 'src/app/modules/auth/services'
// OperationFormModalComponent
@Component({
  selector: 'operation-binnacle-grid-component',
  templateUrl: './operation-binnacle-grid.component.html',
  styleUrls: ['./operation-binnacle-grid.component.scss']
})
export class OperationBinnacleGridComponent implements AfterViewInit {
  @Input('data')
  set data (data: any[]) {
    if (data !== null) {
      this._data = data
      this.loadData()
    }
  }

  @Input('columns')
  set columns (columns: any[]) {
    if (columns !== null) {
      this._columns = columns
      this.displayedColumns = this._columns.map(column => column.key)
      this.updateElements()
    }
  }

  @Input('loading')
  set loading (loading: boolean) {
    this._loading = loading
  }

  @Input() datesInfo: string = ''

  @Output()
  outActionOperation: EventEmitter<number> = new EventEmitter<number>()

  @Output()
  outActionDialog: EventEmitter<any> = new EventEmitter<any>()

  _data: any[] = []
  _columns: any[] = []
  _loading: boolean = false
  todayString: string = (DateTime.now().weekdayLong + ' ' + DateTime.now().setLocale(this.translate.instant('lang.luxon')).toFormat('d'))
  displayedColumns: string[] = this._columns.map(column => column.key)
  dataSource: any
  operationButton = false
  operationConfirmButton = false

  @ViewChild(MatPaginator) paginator: any
  @ViewChild(MatSort) sort: any

  constructor (
    public translate: TranslateService,
    private loginService: LoginService
  ) {
    const permissions = this.loginService.getPermissions()
    this.operationButton = permissions.includes('operation-binnacle-operation')
    this.operationConfirmButton = permissions.includes('operation-binnacle-operation-confirmation')// permissions.operationConfirmButton = null
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

  setOperation (data: any) {
    this.outActionOperation.emit(data)
  }

  openDialog (typeDialog: any, employee: any) {
    this.outActionDialog.emit({
      typeDialog,
      employee
    })
  }
}
