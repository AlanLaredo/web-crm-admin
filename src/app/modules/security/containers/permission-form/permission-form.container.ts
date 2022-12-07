/* eslint-disable no-useless-constructor */
// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { IPermission } from 'src/app/shared/interfaces'
import { PermissionsGqlService } from '../../services'
import { NotifyService } from 'src/app/shared/services'

@Component({
  templateUrl: './permission-form.container.html',
  styleUrls: ['./permission-form.container.scss']
})
export class PermissionFormContainer implements OnInit {
  loading: boolean = false
  title: string = ''
  permission: Partial<IPermission> = {}

  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private permissionsGqlService: PermissionsGqlService,
    public translate: TranslateService,
    private notifyService: NotifyService
  ) { }

  ngOnInit () {
    const params = this.activatedRoute.snapshot.params
    if (params && params.permissionId) {
      this.title = 'permissionForm.titles.edition'
      this.permissionsGqlService.getOne(params.permissionId).subscribe(
        (data) => {
          this.permission = data
        },
        (Error: any) => {
          this.loading = false
          Swal.fire({ icon: 'error', titleText: this.translate.instant('messages.elementNotFound') }).then(() => {})
        }
      )
    } else {
      this.title = 'permissionForm.titles.creation'
    }
  }

  save ($event: any) {
    const data: IPermission = $event as IPermission
    if (data.id) {
      this.update(data)
    } else {
      this.create(data)
    }
  }

  create (data: IPermission) {
    this.loading = true
    this.permissionsGqlService.create(data).subscribe(
      (data: IPermission) => {
        this.loading = false
        Swal.fire({ icon: 'success', titleText: this.translate.instant('messages.save.success') }).then(() => {
          this.router.navigate(['/admin/security/permissions'])
        })
      },
      (Error: any) => {
        this.loading = false
        // Swal.fire({ icon: 'error', titleText: this.translate.instant('messages.save.error') }).then(() => {})
      }
    )
  }

  update (data: IPermission) {
    this.loading = true
    this.permissionsGqlService.update(data).subscribe(
      (data: IPermission) => {
        this.loading = false
        this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
      },
      () => {
        this.loading = false
      }
    )
  }
}
