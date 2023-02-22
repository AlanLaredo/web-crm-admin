// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'

import { projectedDatasOperation, projectedPeriodOperation } from 'src/app/shared/operations/queries'
import { deleteProjectedPeriodOperation } from 'src/app/shared/operations/mutations'
import { LoginService } from 'src/app/modules/auth/services'
import { DateTime } from 'luxon'
import createProjectedPeriodOperation from 'src/app/shared/operations/mutations/createProjectedPeriod.operation'

@Component({
  templateUrl: './projected-data-grid.container.html',
  styleUrls: ['./projected-data-grid.container.scss']
})
export class ProjectedDataGridContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  data: any[] = []
  filteredData: any[] = []
  columns: any[] = []
  user: any
  dateString: any = ''
  dayOfPeriod: any
  projectedPeriod: any

  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private notifyService: NotifyService,
    private titleService: Title,
    private graphqlService: GraphqlService,
    private loginService: LoginService
  ) {
    this.user = this.loginService.getUser()
  }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('submenu.position') + ' - ' + this.translate.instant('applicationTitle'))
    this.loadTranslations()
    const today: DateTime = DateTime.now()
    this.onChangeDate(today.startOf('month'))
  }

  loadTranslations () {
    this.filterOptions = [
      { key: 'clientKeycode', text: this.translate.instant('projected.clientKeycode') },
      { key: 'clientServiceKeycode', text: this.translate.instant('projected.clientServiceKeycode') },
      { key: 'startDateString', text: this.translate.instant('projected.startDate') },
      { key: 'invoiceTypePayment', text: this.translate.instant('projected.invoiceTypePayment') },
      { key: 'clientName', text: this.translate.instant('projected.clientName') },
      { key: 'subtotal', text: this.translate.instant('projected.subtotal') },
      { key: 'iva', text: this.translate.instant('projected.iva') },
      { key: 'invoiceTotal', text: this.translate.instant('projected.invoiceTotal') },
      { key: 'description', text: this.translate.instant('projected.description') },
      { key: 'invoiced', text: this.translate.instant('projected.invoiced') }
    ]

    this.columns = this.filterOptions.map((column: any) => {
      column.id = column.key
      column.name = column.text
      return column
    })
  }

  loadProjectedData (projectedPeriodId: string) {
    this.loading = true
    this.graphqlService.execute(projectedDatasOperation, { projectedPeriodId }).then((result: any) => {
      this.data = this.processGridData(result)
      this.setDataFiltered(this.data)
      this.loading = false
    })
  }

  processGridData (result: any) {
    return result.map((element: any) => {
      element.startDateString = DateTime.fromJSDate(new Date(element.startDate)).toFormat('D')
      element.startDateString = DateTime.fromJSDate(new Date(element.startDate)).toFormat('D')
      const total = element.invoiceTotal || 0
      if (total !== 0) {
        element.iva = (total / 100) * 16
        element.subtotal = element.invoiceTotal - element.iva
      } else {
        element.subtotal = 0
        element.iva = 0
      }
      element.invoiced = element.invoiceName ? 'Facturado' : 'Pendiente'
      return element
    })
  }

  setDataFiltered (filteredData: any) {
    this.filteredData = filteredData
  }

  async remove () {
    const confirm = await this.notifyService.deleteConfirm()
    if (confirm) {
      this.loading = true
      this.graphqlService.execute(deleteProjectedPeriodOperation, { id: this.projectedPeriod.id }).then(
        (result: any) => {
          this.projectedPeriod = null
          this.loading = false
          this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
          this.data = this.processGridData([])
          this.setDataFiltered(this.data)
        }
      )
    }
  }

  async onChangeDate ($event: any) {
    const date = $event && $event.value ? $event.value : null || $event
    this.dayOfPeriod = DateTime.fromJSDate(new Date(date))
    this.dateString = this.dayOfPeriod.toJSDate().toISOString()
    this.loading = true

    this.projectedPeriod = await this.checkProjectedPeriod(this.dayOfPeriod)
    if (this.projectedPeriod) {
      this.loadProjectedData(this.projectedPeriod.id)
    } else {
      this.data = this.processGridData([])
      this.setDataFiltered(this.data)
      this.loading = false
    }
  }

  async checkProjectedPeriod (date: DateTime) {
    return this.graphqlService.execute(projectedPeriodOperation, { date })
  }

  async save () {
    const data: any = this.projectedPeriod || {}
    data.date = this.dayOfPeriod.startOf('day').toJSDate()
    this.loading = true
    this.projectedPeriod = await this.saveProjectedPeriod(data)
    this.loadProjectedData(this.projectedPeriod.id)
    this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
    this.loading = false
  }

  async saveProjectedPeriod (prenominaPeriod: any) {
    return this.graphqlService.execute(createProjectedPeriodOperation, prenominaPeriod)
  }

  sync () {
    this.loadProjectedData(this.projectedPeriod.id)
  }

  capitalize (word: string) {
    const textArray = word.split('')
    textArray[0] = textArray[0].toUpperCase()
    return textArray.join('')
  }

  datesFilter = (d: Date | null) => {
    const day = d?.getDate()
    return day === 1
  }
}
