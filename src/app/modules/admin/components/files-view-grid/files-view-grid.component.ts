/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

// Third Party
import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { DateTime } from 'luxon'

@Component({
  selector: 'files-view-grid-component',
  templateUrl: './files-view-grid.component.html',
  styleUrls: ['./files-view-grid.component.scss']
})
export class FilesViewGridComponent {
  @Input('data')
  set data (data: any[]) {
    if (data !== null) {
      this._data = data
      this.loadData()
    }
  }

  @Output()
  outActionDelete: EventEmitter<string> = new EventEmitter<string>()

  @Output()
  outActionDownload: EventEmitter<string> = new EventEmitter<string>()

  @Output()
  outActionView: EventEmitter<string> = new EventEmitter<string>()

  _data: any[] = []
  dataSource: any
  _columns: string[] = ['name', 'date', 'actions']

  @ViewChild(MatPaginator) paginator: any
  @ViewChild(MatSort) sort: any

  constructor (
    public translate: TranslateService
  ) {
  }

  loadData () {
    const data: any[] = []
    this._data.forEach((fileRow: any) => {
      const name = fileRow.externalPath.substring(fileRow.externalPath.lastIndexOf('/') + 1)
      const date = DateTime.fromJSDate(new Date(fileRow.createdAt)).setLocale(this.translate.instant('lang.luxon')).toFormat('DDD\',\' hh:mm a')
      const file = {
        name,
        date,
        ...fileRow
      }
      data.push(file)
    })
    this.dataSource = new MatTableDataSource<any>(data)
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

  download (id: string) {
    this.outActionDownload.emit(id)
  }

  view (id: string) {
    this.outActionView.emit(id)
  }
}
