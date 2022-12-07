// Third Party
import { Component, HostListener, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Title } from '@angular/platform-browser'
import Swal from 'sweetalert2'
import { Router } from '@angular/router'

import { IUser } from 'src/app/shared/interfaces/user.interface'
import { UsersGqlService } from '../../services'
import { NotifyService } from 'src/app/shared/services'
@Component({
  templateUrl: './users.container.html',
  styleUrls: ['./users.container.scss']
})
export class UsersContainer implements OnInit {
  loading: boolean = false
  users: IUser[] = []
  filteredUsers: IUser[] = []
  public filterOptions: any = []

  @HostListener('document:keydown', ['$event']) onKeyDown (e: any) {
    if (e.shiftKey && e.keyCode === 78) { // N
      this.router.navigate(['/admin/security/users/create'])
    }
  }

  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private usersGqlService: UsersGqlService,
    private notifyService: NotifyService,
    private router: Router,
    private titleService: Title) {
    this.translate.stream('users.cols').subscribe((cols) => {
      this.filterOptions = [
        { key: 'username', text: cols.username },
        { key: 'email', text: cols.email },
        { key: 'fullName', text: cols.name },
        { key: 'rolename', text: cols.roleName }
      ]
    })
  }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('userForm.titles.page') + ' - ' + this.translate.instant('applicationTitle'))

    this.loadUsers()
  }

  setDataFiltered (filteredUsers: any) {
    this.filteredUsers = filteredUsers
  }

  loadUsers () {
    this.loading = true
    this.usersGqlService.list().subscribe((result) => {
      this.loading = false
      this.users = result
      this.filteredUsers = result
    })
  }

  delete (id: string) {
    Swal.fire({
      icon: 'question',
      title: this.translate.instant('messages.delete.confirmQuestion'),
      showConfirmButton: true,
      showCancelButton: true
    }).then((rs) => {
      if (rs.isConfirmed) {
        this.loading = true
        this.usersGqlService.remove(id).subscribe(
          (result: IUser) => {
            this.loading = false
            this.notifyService.notify(this.translate.instant('messages.delete.success') + ' ' + result.email, 'success')
            this.loadUsers()
          }
        )
      }
    })
  }
}
