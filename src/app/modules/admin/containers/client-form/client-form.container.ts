// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

import { NotifyService } from 'src/app/shared/services'
import Swal from 'sweetalert2'
import { IClient } from '../../models/data'
import { ClientService } from '../../services'

@Component({
  templateUrl: './client-form.container.html',
  styleUrls: ['./client-form.container.scss']
})
export class ClientFormContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  title: string = ''
  client: Partial<IClient> = {}
  saveClient: Partial<IClient> = {}
  isValidClient: boolean = false

  /* eslint-disable no-useless-constructor */
  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    public translate: TranslateService,
    private notifyService: NotifyService
  ) {
  }

  ngOnInit () {
    const params = this.activatedRoute.snapshot.params
    if (params && params.clientId) {
      this.title = 'clients.titles.edition'
      this.clientService.getById(params.clientId).subscribe(
        (data) => {
          this.client = data
          this.setClient(data)
          this.isValidClient = true
        },
        (Error: any) => {
          this.loading = false
          Swal.fire({ icon: 'error', titleText: this.translate.instant('messages.elementNotFound') }).then(() => {})
        }
      )
    } else {
      this.title = 'clients.titles.creation'
    }
  }

  setClient ($event: any) {
    this.saveClient = $event as Partial<IClient>
  }

  setIsValidClient ($event: boolean) {
    this.isValidClient = $event
  }

  save () {
    const data: IClient = this.saveClient as IClient
    if (data.id) {
      this.update(data)
    } else {
      this.create(data)
    }
  }

  create (data: IClient) {
    this.loading = true
    this.clientService.create(data).subscribe(
      (data: IClient) => {
        this.loading = false
        Swal.fire({ icon: 'success', titleText: this.translate.instant('messages.save.success') }).then(() => {
          this.router.navigate(['/admin/clientes'])
        })
      },
      (Error: any) => {
        this.loading = false
        // Swal.fire({ icon: 'error', titleText: this.translate.instant('messages.save.error') }).then(() => {})
      }
    )
  }

  update (data: IClient) {
    this.loading = true
    this.clientService.update(data).subscribe(
      (data: IClient) => {
        this.loading = false
        this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
      },
      () => {
        this.loading = false
      }
    )
  }
}
