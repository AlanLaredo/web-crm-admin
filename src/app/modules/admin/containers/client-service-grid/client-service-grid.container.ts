// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'

import { clientServicesOperation } from 'src/app/shared/operations/queries'
import { deleteClientServiceOperation } from 'src/app/shared/operations/mutations'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  templateUrl: './client-service-grid.container.html',
  styleUrls: ['./client-service-grid.container.scss']
})
export class ClientServiceGridContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  data: any[] = []
  filteredData: any[] = []
  columns: any[] = []
  clientId: string = ''

  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private notifyService: NotifyService,
    private titleService: Title,
    private graphqlService: GraphqlService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('submenu.clientService') + ' - ' + this.translate.instant('applicationTitle'))
    const params = this.activatedRoute.snapshot.params
    this.loadTranslations()
    this.clientId = params.elementId
    this.loadData()
  }

  loadData () {
    this.loading = true
    this.graphqlService.execute(clientServicesOperation, { clientId: this.clientId }).then((result: any) => {
      this.loading = false
      this.data = result.map((clientService: any) => {
        clientService.emergencyContactName = clientService.emergencyContact.name + (clientService.emergencyContact.lastName ? clientService.emergencyContact.lastName : '')
        clientService.paymentContactName = clientService.paymentContact.name + (clientService.paymentContact.lastName ? clientService.paymentContact.lastName : '')
        return clientService
      })
      this.setDataFiltered(this.data)
    })
  }

  setDataFiltered (filteredData: any) {
    this.filteredData = filteredData
  }

  async delete (id: any) {
    const confirm = await this.notifyService.deleteConfirm()
    if (confirm) {
      this.loading = true
      this.graphqlService.execute(deleteClientServiceOperation, { id }).then(
        (result: any) => {
          this.loading = false
          this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
          this.loadData()
        }
      )
    }
  }

  backHistory () {
    this.router.navigate(['/admin/clients/'])
  }

  loadTranslations () {
    this.filterOptions = [{
      key: 'serviceType',
      text: this.translate.instant('clientService.serviceType')
    },
    {
      key: 'scheduleHours',
      text: this.translate.instant('clientService.scheduleHours')
    },
    {
      key: 'serviceCost',
      text: this.translate.instant('clientService.serviceCost')
    },
    {
      key: 'elementCost',
      text: this.translate.instant('clientService.elementCost')
    },
    {
      key: 'patrolCost',
      text: this.translate.instant('clientService.patrolCost')
    },
    {
      key: 'quadBikeCost',
      text: this.translate.instant('clientService.quadBikeCost')
    },
    {
      key: 'bossShiftCost',
      text: this.translate.instant('clientService.bossShiftCost')
    },
    {
      key: 'qrCost',
      text: this.translate.instant('clientService.qrCost')
    },
    {
      key: 'costHolyDays',
      text: this.translate.instant('clientService.costHolyDays')
    },
    {
      key: 'addressExecution',
      text: this.translate.instant('clientService.addressExecution')
    },
    {
      key: 'totalElementsDay',
      text: this.translate.instant('clientService.totalElementsDay')
    },
    {
      key: 'totalElementsNight',
      text: this.translate.instant('clientService.totalElementsNight')
    },
    {
      key: 'totalPatrol',
      text: this.translate.instant('clientService.totalPatrol')
    },
    {
      key: 'totalQuadBike',
      text: this.translate.instant('clientService.totalQuadBike')
    },
    {
      key: 'startDate',
      text: this.translate.instant('clientService.startDate')
    },
    {
      key: 'emergencyContactName',
      text: this.translate.instant('clientService.emergencyContact')
    },
    {
      key: 'paymentContactName',
      text: this.translate.instant('clientService.paymentContact')
    },
    {
      key: 'creditDays',
      text: this.translate.instant('clientService.creditDays')
    },
    {
      key: 'paymentDays',
      text: this.translate.instant('clientService.paymentDays')
    },
    {
      key: 'folioCounterReceipt',
      text: this.translate.instant('clientService.folioCounterReceipt')
    },
    {
      key: 'billing',
      text: this.translate.instant('clientService.billing')
    },
    {
      key: 'branchBank',
      text: this.translate.instant('clientService.branchBank')
    },
    {
      key: 'lastFourDigits',
      text: this.translate.instant('clientService.lastFourDigits')
    },
    {
      key: 'paymentMethod',
      text: this.translate.instant('clientService.paymentMethod')
    },
    {
      key: 'usageCfdi',
      text: this.translate.instant('clientService.usageCfdi')
    },
    {
      key: 'paymentForm',
      text: this.translate.instant('clientService.paymentForm')
    }]

    this.columns = this.filterOptions.map((column: any) => {
      column.id = column.key
      column.name = column.text
      return column
    })
    this.columns.push({
      id: 'actions',
      name: this.translate.instant('general.actions')
    })
  }
}
