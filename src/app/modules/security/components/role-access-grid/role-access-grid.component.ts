/* eslint-disable no-useless-constructor */
import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'

import { IRoleAccess } from 'src/app/shared/interfaces/index'

@Component({
  selector: 'role-access-grid-component',
  templateUrl: './role-access-grid.component.html',
  styleUrls: ['./role-access-grid.component.scss']
})
export class RoleAccessGridComponent {
/* eslint-disable no-useless-constructor */
// Third Party
  @Input('data')
  set data (data: IRoleAccess[]) {
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

  _data: IRoleAccess[] = []
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource: any

  @ViewChild(MatPaginator) paginator: any
  @ViewChild(MatSort) sort: any

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService
  ) {
  }

  loadData () {
    this.dataSource = new MatTableDataSource<IRoleAccess>(this._data)
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
