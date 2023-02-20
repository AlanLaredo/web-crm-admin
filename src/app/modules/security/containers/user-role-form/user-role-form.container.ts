// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { companiesOperation, rolePermissionsOperation, userRoleOperation } from 'src/app/shared/operations/queries'
import { createUserRoleOperation, updateUserRoleOperation } from 'src/app/shared/operations/mutations'
import { LoginService } from 'src/app/modules/auth/services'

@Component({
  templateUrl: './user-role-form.container.html',
  styleUrls: ['./user-role-form.container.scss']
})
export class UserRoleFormContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  title: string = ''
  data: any = {
    permissionsIds: []
  }

  permissions: any[] = []
  filteredPermissions: any[] = []
  existsChanges: boolean = false
  user: any
  companies: any[] = []

  /* eslint-disable no-useless-constructor */
  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private graphQlService: GraphqlService,
    public translate: TranslateService,
    private loginService: LoginService,
    private notifyService: NotifyService
  ) {
    this.user = this.loginService.getUser()
  }

  loadTranslations () {
    this.translate.stream('permissions.cols').subscribe((cols) => {
      this.filterOptions = [
        { key: 'name', text: cols.name },
        { key: 'description', text: cols.description }
      ]
    })
  }

  async ngOnInit () {
    this.loadTranslations()

    const params = this.activatedRoute.snapshot.params
    this.loading = true
    const promises: Promise<any>[] = [
      this.graphQlService.execute(companiesOperation),
      this.graphQlService.execute(rolePermissionsOperation)
    ]

    if (params && params.elementId) {
      this.title = 'general.titles.edition'
      promises.push(this.graphQlService.execute(userRoleOperation, { id: params.elementId }))
    } else {
      this.title = 'general.titles.creation'
    }
    let [companies, permissions, data] = await Promise.all(promises)
    this.companies = companies

    if (this.user?.userRole?.name !== 'CrmAdmin') {
      permissions = (permissions || []).filter((permission: any) => {
        return !['company', 'company.set',
          'company.delete',
          'companyGroups',
          'companyGroups.set',
          'companyGroups.delete'].includes(permission.tag)
      })
    }
    this.loading = false
    this.permissions = permissions
    if (data) {
      this.data = data
    }
    this.setDataFiltered(this.permissions)
  }

  async save ($event: any) {
    const data = $event
    this.loading = true
    data.permissionsIds = this.data?.permissionsIds || []
    const result = await this.graphQlService.execute(data.id ? updateUserRoleOperation : createUserRoleOperation, data)
    this.data = result
    this.existsChanges = false
    this.loading = false
    if (!data.id) {
      Swal.fire({ icon: 'success', titleText: this.translate.instant('messages.save.success') }).then(() => {
        this.router.navigate(['/admin/security/user-role'])
      })
    } else {
      this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
    }
  }

  deletePermission ($event: string) {
    this.existsChanges = true
    this.data.permissionsIds = this.data.permissionsIds.filter((permission: string) => permission !== $event)
    this.setDataFiltered(this.filteredPermissions)
  }

  addPermission ($event: string) {
    this.existsChanges = true
    this.data.permissionsIds.push($event)
    this.setDataFiltered(this.filteredPermissions)
  }

  setDataFiltered (filteredPermissions: any) {
    filteredPermissions.map((element: any) => {
      element.exists = this.data && (this.data?.permissionsIds || []).includes(element.id)
      return element
    })
    this.filteredPermissions = filteredPermissions
  }
}
