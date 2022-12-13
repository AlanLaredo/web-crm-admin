// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { companyGroupOperation } from 'src/app/shared/operations/queries'
import { createCompanyGroupOperation, updateCompanyGroupOperation } from 'src/app/shared/operations/mutations'

@Component({
  templateUrl: './company-group-form.container.html',
  styleUrls: ['./company-group-form.container.scss']
})
export class CompanyGroupFormContainer implements OnInit {
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
      promises.push(this.graphQlService.execute(companyGroupOperation, { id: params.elementId }))
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
    this.graphQlService.execute(createCompanyGroupOperation, data).then(
      (response: any) => {
        this.loading = false
        Swal.fire({ icon: 'success', titleText: this.translate.instant('messages.save.success') }).then(() => {
          this.router.navigate(['/admin/company/company-group'])
        })
      },
      (Error: any) => {
        this.loading = false
      }
    )
  }

  update (data: any) {
    this.loading = true
    this.graphQlService.execute(updateCompanyGroupOperation, data).then(
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
