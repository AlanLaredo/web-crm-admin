/* eslint-disable no-useless-constructor */
// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { IPermission, IRoleAccess } from 'src/app/shared/interfaces'
import { PermissionsGqlService, RoleAcccessGqlService } from '../../services'
import { NotifyService } from 'src/app/shared/services'

@Component({
  templateUrl: './role-access-form.container.html',
  styleUrls: ['./role-access-form.container.scss']
})
export class RoleAccessFormContainer implements OnInit {
  loading: boolean = false
  title: string = ''
  data: Partial<IRoleAccess> = {}
  permissions: IPermission[] = []

  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roleAcccessGqlService: RoleAcccessGqlService,
    private permissionsGqlService: PermissionsGqlService,
    public translate: TranslateService,
    private notifyService: NotifyService
  ) { }

  ngOnInit () {
    const params = this.activatedRoute.snapshot.params
    if (params && params.roleAccessId) {
      this.title = 'roleAccess.titles.edition'
      this.roleAcccessGqlService.getOne(params.roleAccessId).subscribe(
        (data) => {
          this.data = data
        },
        (Error: any) => {
          this.loading = false
          Swal.fire({ icon: 'error', titleText: this.translate.instant('messages.elementNotFound') }).then(() => {})
        }
      )
    } else {
      this.title = 'roleAccess.titles.creation'
    }
    this.loadPermissions()
  }

  save ($event: any) {
    const data: IRoleAccess = $event as IRoleAccess
    if (data.id) {
      this.update(data)
    } else {
      this.create(data)
    }
  }

  create (data: IRoleAccess) {
    this.loading = true
    this.roleAcccessGqlService.create(data).subscribe(
      (data: IRoleAccess) => {
        this.loading = false
        Swal.fire({ icon: 'success', titleText: this.translate.instant('messages.save.success') }).then(() => {
          this.router.navigate(['/admin/security/role-access'])
        })
      },
      (Error: any) => {
        this.loading = false
      }
    )
  }

  update (data: IRoleAccess) {
    this.loading = true
    this.roleAcccessGqlService.update(data).subscribe(
      (data: IRoleAccess) => {
        this.loading = false
        this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
      },
      () => {
        this.loading = false
      }
    )
  }

  loadPermissions () {
    this.permissionsGqlService.list().subscribe((permissions: IPermission[]) => {
      this.permissions = permissions
    })
  }
}
