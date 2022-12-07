/* eslint-disable no-useless-constructor */
// Third Party
import { Component, HostListener, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { IRoleAccess } from 'src/app/shared/interfaces'
import { NotifyService } from 'src/app/shared/services'
import { RoleAcccessGqlService } from '../../services'
import { Title } from '@angular/platform-browser'

@Component({
  templateUrl: './role-access.container.html',
  styleUrls: ['./role-access.container.scss']
})
export class RoleAccessContainer implements OnInit {
  loading: boolean = false
  data: IRoleAccess[] = []
  filteredData: IRoleAccess[] = []
  public filterOptions: any = []

  @HostListener('document:keydown', ['$event']) onKeyDown (e: any) {
    if (e.shiftKey && e.keyCode === 78) { // N
      this.router.navigate(['/admin/security/role-access/create'])
    }
  }

  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private roleAcccessGqlService: RoleAcccessGqlService,
    private notifyService: NotifyService,
    private router: Router,
    private titleService: Title) {
    this.translate.stream('roleAccess.cols').subscribe((cols) => {
      this.filterOptions = [
        { key: 'name', text: cols.name },
        { key: 'description', text: cols.description }
      ]
    })
  }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('roleAccess.pageTitle') + ' - ' + this.translate.instant('applicationTitle'))
    this.loadData()
  }

  setDataFiltered (filteredData: any) {
    this.filteredData = filteredData
  }

  loadData () {
    this.loading = true
    this.roleAcccessGqlService.list().subscribe((result: any) => {
      this.loading = false
      this.data = result
      this.filteredData = result
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
        this.roleAcccessGqlService.remove(id).subscribe(
          (result: IRoleAccess) => {
            this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
            this.loadData()
          }
        )
      }
    })
  }
}
