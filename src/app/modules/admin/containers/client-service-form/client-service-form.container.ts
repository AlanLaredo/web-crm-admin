// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { clientServiceOperation } from 'src/app/shared/operations/queries'
import { createClientServiceOperation, updateClientServiceOperation } from 'src/app/shared/operations/mutations'

@Component({
  templateUrl: './client-service-form.container.html',
  styleUrls: ['./client-service-form.container.scss']
})
export class ClientServiceFormContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  title: string = ''
  data: any = {}
  clientServiceId: any
  clientId: any

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
    this.clientServiceId = params.clientServiceId
    this.clientId = params.elementId
    if (this.clientServiceId) {
      this.title = 'general.titles.edition'
      promises.push(this.graphQlService.execute(clientServiceOperation, { id: this.clientServiceId }))
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
    data.clientId = this.clientId
    this.loading = true
    this.graphQlService.execute(!data.id ? createClientServiceOperation : updateClientServiceOperation, data).then(
      (response: any) => {
        this.loading = false
        if (!data.id) {
          Swal.fire({ icon: 'success', titleText: this.translate.instant('messages.save.success') }).then(() => {
            this.router.navigate(['/admin/client/clients/' + this.clientId + '/services'])
          })
        } else {
          this.data = response
          this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
        }
      },
      (Error: any) => {
        this.loading = false
      }
    )
  }
}
