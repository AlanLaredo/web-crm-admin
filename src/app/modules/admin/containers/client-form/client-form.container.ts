// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { clientOperation, companiesOperation } from 'src/app/shared/operations/queries'
import { createClientOperation, updateClientOperation } from 'src/app/shared/operations/mutations'

@Component({
  templateUrl: './client-form.container.html',
  styleUrls: ['./client-form.container.scss']
})
export class ClientFormContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  title: string = ''
  data: any = {}
  catalogsData: any = {}

  /* eslint-disable no-useless-constructor */
  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private graphQlService: GraphqlService,
    private notifyService: NotifyService,
    public translate: TranslateService
  ) {
  }

  async ngOnInit () {
    const params = this.activatedRoute.snapshot.params
    this.loading = true
    const promises: Promise<any>[] = [
      // this.graphQlService.execute(clientGroupsOperation),
      this.graphQlService.execute(companiesOperation)
    ]

    if (params && params.elementId) {
      this.title = 'general.titles.edition'
      promises.push(this.graphQlService.execute(clientOperation, { id: params.elementId }))
    } else {
      this.title = 'general.titles.creation'
    }
    const [rsCompanies, data] = await Promise.all(promises)
    this.loading = false
    if (data) {
      this.data = data
    }
    // this.catalogsData.clientGroups = rsClientGroups
    this.catalogsData.companies = rsCompanies
    this.catalogsData = { ...this.catalogsData }
  }

  save ($event: any) {
    const data = $event
    this.loading = true
    this.graphQlService.execute(data.id ? updateClientOperation : createClientOperation, data).then(
      (response: any) => {
        this.data = response
        this.loading = false
        if (!data.id) {
          Swal.fire({ icon: 'success', titleText: this.translate.instant('messages.save.success') }).then(() => {
            this.router.navigate(['/admin/clients'])
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
