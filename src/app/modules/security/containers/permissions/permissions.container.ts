/* eslint-disable no-useless-constructor */
// Third Party
import { Component, HostListener, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'
import { Title } from '@angular/platform-browser'

import { IPermission } from 'src/app/shared/interfaces'
import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { PermissionsGqlService } from '../../services'
import { rolePermissionsOperation } from 'src/app/shared/operations/queries'

@Component({
  templateUrl: './permissions.container.html',
  styleUrls: ['./permissions.container.scss']
})
export class PermissionsContainer implements OnInit {
  loading: boolean = false
  data: IPermission[] = []
  filteredData: IPermission[] = []
  public filterOptions: any = []

  @HostListener('document:keydown', ['$event']) onKeyDown (e: any) {
    if (e.shiftKey && e.keyCode === 78) { // N
      this.router.navigate(['/admin/security/role-permissions/create'])
    }
  }

  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private permissionsGqlService: PermissionsGqlService,
    private notifyService: NotifyService,
    private graphQlService: GraphqlService,
    private router: Router,
    private titleService: Title) {
    this.translate.stream('permissions.cols').subscribe((cols) => {
      this.filterOptions = [
        { key: 'name', text: cols.name },
        { key: 'description', text: cols.description },
        { key: 'tag', text: cols.tag }
      ]
    })
  }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('permissions.pageTitle') + ' - ' + this.translate.instant('applicationTitle'))
    this.loadData()
  }

  setDataFiltered (filteredData: any) {
    this.filteredData = filteredData
  }

  loadData () {
    this.loading = true
    this.graphQlService.execute(rolePermissionsOperation).then((result: any) => {
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
        this.permissionsGqlService.remove(id).subscribe(
          (result: IPermission) => {
            this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
            this.loadData()
          }
        )
      }
    })
  }
}
