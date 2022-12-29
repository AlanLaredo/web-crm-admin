// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { clientOperation, companiesOperation, customerOperation } from 'src/app/shared/operations/queries'
import { createClientOperation, updateClientOperation, updateCustomerOperation } from 'src/app/shared/operations/mutations'

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
  customer: any

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

    if (params) {
      if (params.elementId) {
        this.title = 'general.titles.edition'
        promises.push(this.graphQlService.execute(clientOperation, { id: params.elementId }))
      } else {
        this.title = 'general.titles.creation'
      }
      if (params.customerId) {
        promises.push(this.graphQlService.execute(customerOperation, { id: params.customerId }))
      }
    }
    const [rsCompanies, data, customer] = await Promise.all(promises)
    this.loading = false
    if (data && params.elementId) {
      this.data = data
    }
    if (customer) {
      this.customer = customer
    } else if (!params.elementId && params.customerId) {
      this.customer = data
      if (data.client) {
        this.data = data.client
      } else {
        this.data = {
          businessName: data.customerName,
          legalRepresentativeContact: data.contact
        }
      }
    }
    this.catalogsData.companies = rsCompanies
    this.catalogsData = { ...this.catalogsData }
  }

  save ($event: any) {
    const data = $event
    this.loading = true
    this.graphQlService.execute(data.id ? updateClientOperation : createClientOperation, data).then(
      async (response: any) => {
        this.data = response

        if (this.customer) {
          await this.graphQlService.execute(updateCustomerOperation, { id: this.customer.id, clientId: response.id })
        }

        this.loading = false

        if (!data.id) {
          Swal.fire({ icon: 'success', titleText: this.translate.instant('messages.save.success') }).then(() => {
            if (!this.customer) {
              this.router.navigate(['/admin/clients/'])
            } else {
              this.router.navigate(['/admin/process/process/'])
            }
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
