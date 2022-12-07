/* eslint-disable no-useless-constructor */
// Third Party
import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'

import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { IUser } from 'src/app/shared/interfaces/user.interface'

@Component({
  selector: 'users-list-component',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input('users')
  set users (users: IUser[]) {
    if (users !== null) {
      this._users = users
      this.loadData()
    }
  }

  @Output()
  outActionDelete: EventEmitter<string> = new EventEmitter<string>()

  get users () {
    return this._users
  }

  _users: IUser[] = []
  displayedColumns: string[] = ['name', 'username', 'email', 'roleName', 'Acciones'];
  dataSource: any

  @ViewChild(MatPaginator) paginator: any
  @ViewChild(MatSort) sort: any

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService
  ) {
  }

  loadData () {
    this.dataSource = new MatTableDataSource<IUser>(this._users)
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
