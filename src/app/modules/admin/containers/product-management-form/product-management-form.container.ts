// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { productManagementOperation } from 'src/app/shared/operations/queries'
import { createProductManagementOperation, updateProductManagementOperation } from 'src/app/shared/operations/mutations'

@Component({
  templateUrl: './product-management-form.container.html',
  styleUrls: ['./product-management-form.container.scss']
})
export class ProductManagementFormContainer implements OnInit {
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
      promises.push(this.graphQlService.execute(productManagementOperation, { id: params.elementId }))
    } else {
      this.title = 'general.titles.creation'
    }
    const [data] = await Promise.all(promises)

    this.loading = false
    if (data) {
      this.data = data
    }
  }

  async save ($event: any) {
    const data = $event
    this.loading = true

    this.graphQlService.execute(data.id ? updateProductManagementOperation : createProductManagementOperation, data).then(
      (response: any) => {
        this.data = response
        this.loading = false
        if (!data.id) {
          Swal.fire({ icon: 'success', titleText: this.translate.instant('messages.save.success') }).then(() => {
            this.router.navigate(['/admin/inventory/products'])
          })
        } else {
          this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
        }
      },
      () => {
        this.notifyService.notify(this.translate.instant('messages.update.error'), 'error')
        this.loading = false
      }
    )
  }
}
