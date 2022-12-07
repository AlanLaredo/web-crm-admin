/* eslint-disable no-useless-constructor */
// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'
import { Title } from '@angular/platform-browser'

import { IPermission, IRoleAccess } from 'src/app/shared/interfaces'
import { IUser } from 'src/app/shared/interfaces/user.interface'
import { PermissionsGqlService, UsersGqlService } from '../../services'
import { RoleAcccessGqlService } from '../../services/graphql/role-access.gql.service'
import { NotifyService } from 'src/app/shared/services'
import { IUserPermissionConfig } from '../../interfaces/user-permission-config.interface'

@Component({
  templateUrl: './user-form.container.html',
  styleUrls: ['./user-form.container.scss']
})
export class UserFormContainer implements OnInit {
  loading: boolean = false
  title: string = ''
  user: Partial<IUser> = {}
  roleAccessList: IRoleAccess[] = []
  permissions: IPermission[] = []

  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roleAccessGqlService: RoleAcccessGqlService,
    private usersGqlService: UsersGqlService,
    private permissionsGqlService: PermissionsGqlService,
    public translate: TranslateService,
    private notifyService: NotifyService,
    private titleService: Title
  ) { }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('userForm.titles.page') + ' - ' + this.translate.instant('applicationTitle'))

    this.loadRoleAccessList()
    // this.loadPermissions()
    const params = this.activatedRoute.snapshot.params
    if (params && params.userId) {
      this.title = 'userForm.titles.edition'
      this.usersGqlService.getOne(params.userId).then(
        (data) => {
          this.user = data
          // this.processPermissionsData()
        },
        (Error: any) => {
          this.loading = false
          Swal.fire({ icon: 'error', titleText: this.translate.instant('users.messages.notFoundUser') }).then(() => {})
        }
      )
    } else {
      this.title = 'userForm.titles.creation'
    }
  }

  save ($event: any) {
    // const permissionsConfig = this.user.permissionsConfig?.map((permissionConfig): IUserPermissionConfig => {
    //   return {
    //     permissionId: permissionConfig.permissionId,
    //     deny: permissionConfig.deny
    //   }
    // })

    const data: IUser = { ...$event/*, permissionsConfig */ } as IUser
    if (data.id) {
      this.update(data)
    } else {
      this.create(data)
    }
  }

  create (data: IUser) {
    this.loading = true
    this.usersGqlService.create(data).then(
      (data: IUser) => {
        this.loading = false
        Swal.fire({ icon: 'success', titleText: this.translate.instant('users.messages.save.success') }).then(() => {
          this.router.navigate(['/admin/security/users'])
        })
      },
      (Error: any) => {
        this.loading = false
        Swal.fire({ icon: 'error', titleText: this.translate.instant('users.messages.save.error') }).then(() => {})
      }
    )
  }

  update (data: IUser) {
    this.loading = true
    this.usersGqlService.update(data).then(
      (data: IUser) => {
        this.user = data
        this.loading = false
        // this.processPermissionsData()
        this.notifyService.notify(this.translate.instant('form.changesSaved'), 'success')
      },
      () => {
        this.loading = false
      }
    )
  }

  processPermissionsData () {
    this.user.permissionIds = []
    const denyPermissionsConfig: string[] = []
    this.user.permissionsConfig?.forEach(permission => {
      if (!permission.deny) {
        this.user.permissionIds?.push(permission.permissionId)
      } else {
        denyPermissionsConfig?.push(permission.permissionId)
      }
    })
    this.user.roleAccess?.permissionIds.forEach(
      (permissionId: string) => {
        if (denyPermissionsConfig?.indexOf(permissionId) === -1) {
          this.user.permissionIds?.push(permissionId)
        }
      }
    )
  }

  updatePermissionSettings ($event: any) {
    const permissionIds = $event
    this.user.permissionsConfig = []
    // recorre los seleccionados y agregalos si no son parte del rol: explicito positivo
    permissionIds.forEach(
      (permissionId: string) => {
        if (!this.user.roleAccess || !this.user.roleAccess.permissionIds || this.user.roleAccess?.permissionIds.indexOf(permissionId) === -1) {
          const configPermission: IUserPermissionConfig = {
            permissionId,
            deny: false
          }
          this.user.permissionsConfig?.push(configPermission)
        }
      }
    )

    // recorre todos los permisos y si no estan seleccionados y están dentro del rol actual: crea explicito negativo
    this.permissions.forEach((permission: IPermission) => {
      if (permissionIds.indexOf(permission.id) === -1 && this.user.roleAccess?.permissionIds.indexOf(permission.id) !== -1) {
        const configPermission: IUserPermissionConfig = {
          permissionId: permission.id,
          deny: true
        }
        this.user.permissionsConfig?.push(configPermission)
      }
    })
  }

  loadRoleAccessList () {
    this.roleAccessGqlService.list().subscribe(
      (data) => {
        this.roleAccessList = data
      },
      (Error: any) => {
        this.loading = false
        Swal.fire({ icon: 'error', titleText: this.translate.instant('messages.load.error') }).then(() => {})
      }
    )
  }

  loadPermissions () {
    this.permissionsGqlService.list().subscribe(
      (data) => {
        this.permissions = data
      },
      (Error: any) => {
        this.loading = false
        Swal.fire({ icon: 'error', titleText: this.translate.instant('messages.load.error') }).then(() => {})
      }
    )
  }

  newRoleAccess: Partial<IRoleAccess> = {}
  changeRoleAccess ($event:any) {
    this.user.roleAccess = $event
    // this.user.permissionsConfig = []
    // this.user.permissionIds = [] // solo despues del update
    // this.processPermissionsData()
  }
}
