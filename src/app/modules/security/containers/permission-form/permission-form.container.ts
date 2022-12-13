/* eslint-disable no-useless-constructor */
// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { IPermission } from 'src/app/shared/interfaces'
import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { rolePermissionOperation } from 'src/app/shared/operations/queries'
import { createRolePermissionOperation, updateRolePermissionOperation } from 'src/app/shared/operations/mutations'

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
    private graphqlService: GraphqlService,
    public translate: TranslateService,
    private notifyService: NotifyService
  ) { }

  ngOnInit () {
    const params = this.activatedRoute.snapshot.params
    if (params && params.elementId) {
      this.title = 'permissionForm.titles.edition'
      this.graphqlService.execute(rolePermissionOperation, { id: params.elementId }).then(
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
    const permission: IPermission = $event as IPermission
    this.loading = true
    this.graphqlService.execute(permission.id ? updateRolePermissionOperation : createRolePermissionOperation, permission).then(
      (data: IPermission) => {
        this.loading = false
        Swal.fire({ icon: 'success', titleText: this.translate.instant('messages.' + (data.id ? 'update' : 'save') + '.success') }).then(() => {
          if (!permission.id) {
            this.router.navigate(['/admin/security/role-permissions'])
          }
        })
      },
      (Error: any) => {
        this.loading = false
        // Swal.fire({ icon: 'error', titleText: this.translate.instant('messages.save.error') }).then(() => {})
      }
    )
  }
}
