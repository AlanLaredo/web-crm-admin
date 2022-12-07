/* eslint-disable no-useless-constructor */
// Third Party
import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { MatDialog } from '@angular/material/dialog'

import { IClient } from '../../models/data'
import { DataEventLogModalComponent } from '../data-event-log-modal'

@Component({
  selector: 'clients-grid-component',
  templateUrl: './clients-grid.component.html',
  styleUrls: ['./clients-grid.component.scss']
})
export class ClientsGridComponent {
  @Input('data')
  set data (data: IClient[]) {
    if (data !== null) {
      this._data = data
      this.loadData()
    }
  }

  get data () {
    return this._data
  }

  @Output()
  outActionDelete: EventEmitter<string> = new EventEmitter<string>()

  _data: IClient[] = []
  displayedColumns: string[] = ['name', 'email', 'managerName', 'contactNumbers', 'address', 'actions'];
  dataSource: any

  @ViewChild(MatPaginator) paginator: any
  @ViewChild(MatSort) sort: any

  constructor (
    public translate: TranslateService,
    private dialog: MatDialog
  ) {
  }

  loadData () {
    this.dataSource = new MatTableDataSource<IClient>(this._data)
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

  openEventLogInfoModal (data: any) {
    this.dialog.open(DataEventLogModalComponent, {
      width: '450px',
      data
    })
  }
}
