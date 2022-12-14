// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { clientsOperation, positionOperation } from 'src/app/shared/operations/queries'
import { createPositionOperation, updatePositionOperation } from 'src/app/shared/operations/mutations'

@Component({
  templateUrl: './position-form.container.html',
  styleUrls: ['./position-form.container.scss']
})
export class PositionFormContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  title: string = ''
  data: any = {}
  clients: any[] = []

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
    const promises: Promise<any>[] = [
      this.graphQlService.execute(clientsOperation)
    ]

    if (params && params.elementId) {
      this.title = 'general.titles.edition'
      promises.push(this.graphQlService.execute(positionOperation, { id: params.elementId }))
    } else {
      this.title = 'general.titles.creation'
    }
    const [clients, data] = await Promise.all(promises)

    this.loading = false
    this.clients = clients
    if (data) {
      this.data = data
    }
  }

  save ($event: any) {
    const data = $event
    this.loading = true
    this.graphQlService.execute(data.id ? updatePositionOperation : createPositionOperation, data).then(
      (response: any) => {
        this.data = response
        this.loading = false
        if (!data.id) {
          Swal.fire({ icon: 'success', titleText: this.translate.instant('messages.save.success') }).then(() => {
            this.router.navigate(['/admin/recruitment/position'])
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
