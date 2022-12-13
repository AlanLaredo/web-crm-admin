/* eslint-disable no-useless-constructor */
// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'
import { Title } from '@angular/platform-browser'

import { PermissionsGqlService, UsersGqlService } from '../../services'
import { RoleAcccessGqlService } from '../../services/graphql/role-access.gql.service'
import { GraphqlService, NotifyService } from 'src/app/shared/services'

import { companiesOperation, userRolesOperation, userOperation } from 'src/app/shared/operations/queries/'

@Component({
  templateUrl: './user-form.container.html',
  styleUrls: ['./user-form.container.scss']
})
export class UserFormContainer implements OnInit {
  loading: boolean = false
  title: string = ''
  user: any = {}
  roleAccessList: any[] = []
  permissions: any[] = []
  companies: any[] = []

  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roleAccessGqlService: RoleAcccessGqlService,
    private usersGqlService: UsersGqlService,
    private graphQlService: GraphqlService,
    private permissionsGqlService: PermissionsGqlService,
    public translate: TranslateService,
    private notifyService: NotifyService,
    private titleService: Title
  ) { }

  async ngOnInit () {
    this.titleService.setTitle(this.translate.instant('userForm.titles.page') + ' - ' + this.translate.instant('applicationTitle'))

    const promises = [
      this.graphQlService.execute(companiesOperation),
      this.graphQlService.execute(userRolesOperation)
    ]
    const params = this.activatedRoute.snapshot.params
    if (params && params.userId) {
      this.title = 'userForm.titles.edition'
      promises.push(this.graphQlService.execute(userOperation, { id: params.userId }))
    } else {
      this.title = 'userForm.titles.creation'
    }
    const [companies, userRoles, user] = await Promise.all(promises)
    this.companies = companies
    this.roleAccessList = userRoles
    if (user) {
      this.user = user
    }
  }

  save ($event: any) {
    const data: any = { ...$event/*, permissionsConfig */ } as any
    if (data.id) {
      this.update(data)
    } else {
      this.create(data)
    }
  }

  create (data: any) {
    this.loading = true
    this.usersGqlService.create(data).then(
      (data: any) => {
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

  update (data: any) {
    this.loading = true
    this.usersGqlService.update(data).then(
      (data: any) => {
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

  newRoleAccess: Partial<any> = {}
  changeRoleAccess ($event:any) {
    this.user.roleAccess = $event
    // this.user.permissionsConfig = []
    // this.user.permissionIds = [] // solo despues del update
    // this.processPermissionsData()
  }
}
