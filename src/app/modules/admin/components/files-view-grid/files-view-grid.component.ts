/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

// Third Party
import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'

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

  @Input('columns')
  set columns (columns: string[]) {
    if (columns !== null) {
      this._columns = columns
      this.loadData()
    }
  }

  @Input('cleanSelectedFiles')
  set cleanSelectedFiles (cleanSelectedFiles: string[]) {
    if (cleanSelectedFiles === null || cleanSelectedFiles.length === 0) {
      this.selectedFiles = []
    }
  }

  @Output()
  outActionDelete: EventEmitter<string> = new EventEmitter<string>()

  @Output()
  outActionDownload: EventEmitter<string> = new EventEmitter<string>()

  @Output()
  outActionView: EventEmitter<string> = new EventEmitter<string>()

  @Output()
  outActionNewFiles: EventEmitter<any> = new EventEmitter<any>()

  _data: any[] = []
  dataSource: any
  _columns: string[] = ['document', 'filename', 'actions']
  loading: boolean = false

  @ViewChild(MatPaginator) paginator: any
  @ViewChild(MatSort) sort: any

  constructor (
    public translate: TranslateService
  ) {
  }

  loadData () {
    // const data: any[] = []
    // this._data.forEach((fileRow: any) => {
    //   const name = fileRow.filename
    //   const file = {
    //     name,
    //     ...fileRow
    //   }
    //   data.push(file)
    // })
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

  onFileComplete ($event: any) {
  }

  selectedFiles: any[] = []
  uploadFile ($event: any, document: string) {
    if (!$event.data) {
      return
    }
    this.selectedFiles.push({ file: $event.data, document })
    this.outActionNewFiles.emit(this.selectedFiles)
  }

  removeTemporalFile ($event: any) {
    const index = $event
    if (index > -1) {
      this.selectedFiles.splice(index, 1)
    }
    this.outActionNewFiles.emit(this.selectedFiles)
  }

  download (awsKey: string) {
    this.outActionDownload.emit(awsKey)
  }

  delete (awsKey: string) {
    this.outActionDelete.emit(awsKey)
  }

  view (awsKey: string) {
    this.outActionView.emit(awsKey)
  }
}
