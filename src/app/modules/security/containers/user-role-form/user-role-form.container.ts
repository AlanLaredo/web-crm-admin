// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { userRoleOperation } from 'src/app/shared/operations/queries'
import { createUserRoleOperation, updateUserRoleOperation } from 'src/app/shared/operations/mutations'

@Component({
  templateUrl: './user-role-form.container.html',
  styleUrls: ['./user-role-form.container.scss']
})
export class UserRoleFormContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  title: string = ''
  data: any = {}

  /* eslint-disable no-useless-constructor */
  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private graphQlService: GraphqlService,
    public translate: TranslateService,
    private notifyService: NotifyService
  ) {
  }

  async ngOnInit () {
    const params = this.activatedRoute.snapshot.params
    this.loading = true
    const promises: Promise<any>[] = []

    if (params && params.elementId) {
      this.title = 'general.titles.edition'
      promises.push(this.graphQlService.execute(userRoleOperation, { id: params.elementId }))
    } else {
      this.title = 'general.titles.creation'
    }
    const [data] = await Promise.all(promises)
    this.loading = false
    if (data) {
      this.data = data
    }
  }

  save ($event: any) {
    const data = $event
    if (data.id) {
      this.update(data)
    } else {
      this.create(data)
    }
  }

  create (data: any) {
    this.loading = true
    this.graphQlService.execute(createUserRoleOperation, data).then(
      (response: any) => {
        this.loading = false
        Swal.fire({ icon: 'success', titleText: this.translate.instant('messages.save.success') }).then(() => {
          this.router.navigate(['/admin/security/user-role'])
        })
      },
      (Error: any) => {
        this.loading = false
      }
    )
  }

  update (data: any) {
    this.loading = true
    this.graphQlService.execute(updateUserRoleOperation, data).then(
      (data: any) => {
        this.loading = false
        this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
      },
      () => {
        this.loading = false
      }
    )
  }
}
