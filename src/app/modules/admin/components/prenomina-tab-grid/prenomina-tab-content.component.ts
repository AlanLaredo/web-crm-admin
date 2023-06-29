/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */
// Third Party
import { HttpClient } from '@angular/common/http'
import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { DateTime } from 'luxon'
import * as fileSaver from 'file-saver'

import { createPrenominaPeriodOperation, deletePrenominaPeriodOperation, updatePrenominaPeriodEmployeeOperation, updatePrenominaPeriodOperation } from 'src/app/shared/operations/mutations'
import { operationsOperation, prenominaPeriodEmployeesOperation, prenominaPeriodOperation } from 'src/app/shared/operations/queries'
import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { environment } from 'src/environments/environment'
import { OPERATIONS_CATALOG_DATA, PERIODS_CATALOG_DATA } from '../../data'
import { UploadFilesComponent } from 'src/app/shared/components'
import { UploadFileModel } from 'src/app/shared/components/upload-files-component/upload-file.model'

@Component({
  selector: 'prenomina-tab-content-component',
  templateUrl: './prenomina-tab-content.component.html',
  styleUrls: ['./prenomina-tab-content.component.scss']
})
export class CompanyTabContentComponent implements OnInit {
  @Input('prenominaConfiguration')
  set prenominaConfiguration (prenominaConfiguration: any[]) {
      this._prenominaConfiguration = prenominaConfiguration
      this.loadDefaultDate()
  }

  @Output()
  outActionRemove: EventEmitter<any> = new EventEmitter<any>()

  loading: boolean = false

  prenominaPeriod: any = {
    id: null,
    completed: false
  }

  _prenominaConfiguration: any = {}

  dateString: any = ''
  dayOfPeriod: any
  availableDates: any[] = []
  columns: any[] = []

  constructor (private graphqlService: GraphqlService,
    private notifyService: NotifyService,
    private httpClient: HttpClient,
    private translate: TranslateService) {
  }

  ngOnInit (): void {
  }

  async onChangeDate ($event: any) {
    const date = $event && $event.value ? $event.value : null || $event
    this.dayOfPeriod = DateTime.fromJSDate(new Date(date))
    this.dateString = this.dayOfPeriod.toJSDate().toISOString()
    const days = this.getDaysForPeriod(this.dayOfPeriod, this._prenominaConfiguration)
    this.loading = true

    this.prenominaPeriod = await this.checkPrenominaPeriod()
    this.generateColumnsConfiguration(days)
    await this.loadPrenominaPeriodEmployee(this.prenominaPeriod && this.prenominaPeriod.id ? this.prenominaPeriod.id : null)
    this.loading = false
  }

  generateColumnsConfiguration (days: DateTime[]) {
    this.translate.stream('periods.cols').subscribe((cols) => {
      this.filterOptions = [
        { key: 'keycode', text: cols.keycode },
        { key: 'bankAccount', text: cols.bankAccount },
        { key: 'clientName', text: cols.clientName },
        { key: 'employeeName', text: cols.employeeName },
        { key: 'salary', text: cols.salary },
        { key: 'absences', text: cols.absences },
        { key: 'saving', text: cols.saving },
        { key: 'uniforms', text: cols.uniforms },
        { key: 'advance', text: cols.advance },
        { key: 'double', text: cols.double },
        { key: 'bonus', text: cols.bonus },
        { key: 'holiday', text: cols.holiday },
        { key: 'infonavit', text: cols.infonavit },
        { key: 'fonacot', text: cols.fonacot },
        { key: 'loan', text: cols.loan },
        { key: 'loanDeposit', text: cols.loanDeposit },
        { key: 'nss', text: cols.nss },
        { key: 'differenceWithoutImss', text: cols.differenceWithoutImss },
        { key: 'total', text: cols.total }
      ]
    })

    this.columns = [
      { key: 'keycode', text: this.translate.instant('periods.cols.keycode') },
      { key: 'bankAccount', text: this.translate.instant('periods.cols.bankAccount') },
      { key: 'clientName', text: this.translate.instant('periods.cols.clientName') },
      { key: 'clientService', text: this.translate.instant('periods.cols.clientService') },
      { key: 'employeeName', text: this.translate.instant('periods.cols.employeeName') }
    ]

    this.columns = [...this.columns, ...days.map((date: DateTime) => {
      const dateName = this.capitalize(date.weekdayLong) + ' ' + date.setLocale(this.translate.instant('lang.luxon')).toFormat('d')
      return {
        key: date.toFormat('D'),
        text: dateName.split(' ')[0],
        extra: dateName.split(' ')[1]
      }
    })]

    let finalColumns: any[] = []
    finalColumns = [
      { key: 'salary', text: this.translate.instant('periods.cols.salary') },
      { key: 'absences', text: this.translate.instant('periods.cols.absences') },
      { key: 'saving', text: this.translate.instant('periods.cols.saving') },
      { key: 'uniforms', text: this.translate.instant('periods.cols.uniforms') },
      { key: 'advance', text: this.translate.instant('periods.cols.advance') },
      { key: 'double', text: this.translate.instant('periods.cols.double') },
      { key: 'bonus', text: this.translate.instant('periods.cols.bonus') },
      { key: 'holiday', text: this.translate.instant('periods.cols.holiday') },
      { key: 'infonavit', text: this.translate.instant('periods.cols.infonavit') },
      { key: 'fonacot', text: this.translate.instant('periods.cols.fonacot') },
      { key: 'loan', text: this.translate.instant('periods.cols.loan') },
      { key: 'loanDeposit', text: this.translate.instant('periods.cols.loanDeposit') },
      { key: 'nss', text: this.translate.instant('periods.cols.nss') },
      { key: 'differenceWithoutImss', text: this.translate.instant('periods.cols.differenceWithoutImss') },
      { key: 'total', text: this.translate.instant('periods.cols.total') }
    ]

    this.columns = [...this.columns, ...finalColumns]
  }

  getDaysForPeriod (dayOfPeriod: DateTime, prenominaConfiguration: any) {
    const { billingPeriod } = prenominaConfiguration

    const plusDays = billingPeriod === 'weekly' ? 6 : billingPeriod === 'biweekly' ? (dayOfPeriod.day < 14 ? 14 : (dayOfPeriod.endOf('month').day - 16)) : dayOfPeriod.endOf('month').day - 1

    let startDate = dayOfPeriod
    const dates: DateTime[] = [startDate]
    Array.from(Array(plusDays).keys()).forEach(() => {
      startDate = startDate.plus({ days: 1 })
      dates.push(startDate)
    })
    return dates
  }

  loadDefaultDate () {
    const today: DateTime = DateTime.now()
    switch (this._prenominaConfiguration.billingPeriod) {
      case PERIODS_CATALOG_DATA.weekly: {
        this.onChangeDate(today.startOf('week'))
        break
      }
      case PERIODS_CATALOG_DATA.biweekly: {
        if (today.day < 15) {
          this.onChangeDate(today.startOf('month'))
        } else {
          this.onChangeDate(today.set({ day: 16 }))
        }
        break
      }
      case PERIODS_CATALOG_DATA.monthly: {
        this.onChangeDate(today.startOf('month'))
        break
      }
    }
  }

  async checkPrenominaPeriod () {
    return this.getPrenominaPeriodRow(this.dayOfPeriod.startOf('day').toJSDate(), this._prenominaConfiguration.id)
  }

  getPrenominaPeriodRow (date: Date, prenominaConfigurationId: string) {
    return this.graphqlService.execute(prenominaPeriodOperation, {
      date,
      prenominaConfigurationId
    })
  }

  async remove (id: string) {
    if (await this.notifyService.confirm(this.translate.instant('prenomina.removePrenomina'))) {
      await this.graphqlService.execute(deletePrenominaPeriodOperation, { id })
      this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
      this.loadDefaultDate()
      // this.prenominaPeriod = await this.checkPrenominaPeriod()
    }
  }

  async complete (id: string) {
    this.prenominaPeriod = await this.savePrenominaPeriod({ id, completed: true })
  }

  datesFilter = (d: Date | null) => {
    switch (this._prenominaConfiguration.billingPeriod) {
      case PERIODS_CATALOG_DATA.weekly: {
        return this.weekendsDatesFilter(d)
      }
      case PERIODS_CATALOG_DATA.biweekly: {
        return this.biweekDatesFilter(d)
      }
      case PERIODS_CATALOG_DATA.monthly: {
        return this.monthsDatesFilter(d)
      }
      default: {
        return false
      }
    }
  }

  biweekDatesFilter = (d: Date | null) => {
    const day = d?.getDate()
    return day === 1 || day === 16
  }

  monthsDatesFilter (d: Date | null) {
    const day = d?.getDate()
    return day === 1
  }

  weekendsDatesFilter (d: Date | null) {
    const day = d?.getDay()
    return day === 1
  }

  capitalize (word: string) {
    const textArray = word.split('')
    textArray[0] = textArray[0].toUpperCase()
    return textArray.join('')
  }

  getPrenominaPeriodName () {
    let result
    switch (this._prenominaConfiguration.billingPeriod) {
      case PERIODS_CATALOG_DATA.weekly: {
        const specificDate: DateTime = this.dayOfPeriod
        const startOfMonth = specificDate.startOf('month')
        const weekOfMonth = Math.ceil((specificDate.diff(startOfMonth, 'days').days + 1) / 7)
        result = this._prenominaConfiguration.name + ' - Semana ' + weekOfMonth + ' - ' + this.capitalize(this.dayOfPeriod.monthLong) + ' ' + this.dayOfPeriod.year
        break
      }
      case PERIODS_CATALOG_DATA.biweekly: {
        result = this._prenominaConfiguration.name + ' - Quincena ' + (this.dayOfPeriod.day < 15 ? 1 : 2) + ' - ' + this.capitalize(this.dayOfPeriod.monthLong) + ' ' + this.dayOfPeriod.year
        break
      }
      case PERIODS_CATALOG_DATA.monthly: {
        result = this._prenominaConfiguration.name + ' - ' + this.capitalize(this.dayOfPeriod.monthLong) + ' ' + this.dayOfPeriod.year
        break
      }
    }
    return result
  }

  async save () {
    const data: any = this.prenominaPeriod || {}
    data.date = this.dayOfPeriod.startOf('day').toJSDate()
    data.name = this.getPrenominaPeriodName()
    data.prenominaConfigurationId = this._prenominaConfiguration.id
    data.totalVacancies = this.getVacanciesConfiguration()

    this.loading = true
    this.prenominaPeriod = await this.savePrenominaPeriod(data)
    // await this.processEmployeesInPrenominaPeriod()
    this.loading = false
    this.loadPrenominaPeriodEmployee(this.prenominaPeriod.id)

    this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
  }

  async savePrenominaPeriod (data: any) {
    return this.graphqlService.execute(data.id ? updatePrenominaPeriodOperation : createPrenominaPeriodOperation, data)
  }

  getVacanciesConfiguration () {
    const result: any[] = []
    const clients = this._prenominaConfiguration.clients
    if (clients && clients.length > 0) {
      clients.forEach((client: any) => {
        if (client.clientServices && client.clientServices.length > 0) {
          const { clientServices } = client
          clientServices.forEach((clientService: any) => {
            // if (clientService.billing === this._prenominaConfiguration.billingPeriod) { // TODO: Activar si el billing period debe coincidir con el billingPeriod de Prenominaconfiguration
            let total = 0
            if (clientService.totalElementsDay && clientService.totalElementsDay > 0) {
              total += Number(clientService.totalElementsDay)
            }
            if (clientService.totalElementsNight) {
              total += Number(clientService.totalElementsNight)
            }
            if (total > 0) {
              return Array.from(Array(total).keys()).forEach(() => {
                result.push({
                  clientName: client.businessName,
                  clientServiceName: clientService.name,
                  totalVacancies: 1
                })
              })
            }
            // }
          })
        }
      })
    }
    return result
  }

  async loadOperationsByEmployeeId (employeeId: string, date: Date) {
    return this.graphqlService.execute(operationsOperation, { employeeId, date })
  }

  getPeriodMultiplicator () {
    const period: string = this._prenominaConfiguration.billingPeriod
    return period === PERIODS_CATALOG_DATA.weekly ? 7 : period === PERIODS_CATALOG_DATA.biweekly ? (this.dayOfPeriod.day < 15 ? 15 : (this.dayOfPeriod.endOf('month').day - 15)) : this.dayOfPeriod.endOf('month').day
  }

  getPrenominaPeriodEmployees () {
    return this.prenominaPeriod.prenominaPeriodEmployees
  }

  getClientServicesEmployees () {
    let result: any[] = []
    const { clients } = this._prenominaConfiguration
    clients.forEach((client: any) => {
      const { clientServices } = client
      clientServices.forEach((clientService: any) => {
        // if (clientService.billing === this._prenominaConfiguration.billingPeriod) { // TODO: Activar si el billing period debe coincidir con el billingPeriod de Prenominaconfiguration
        result = [...result, ...clientService.employees]
        // }
      })
    })
    return result
  }

  prenominaPeriodEmployees: any[] = []
  prenominaPeriodEmployeesData: any[] = []
  async loadPrenominaPeriodEmployee (id: string | null) {
    if (id) {
      this.loading = true
      this.prenominaPeriodEmployees = await this.getPrenominaPeriodEmployeeByPrenominaPeriodId(id)
      this.loading = false
    } else {
      this.prenominaPeriodEmployees = []
    }
    this.prenominaPeriodEmployeesData = this.processPrenominaPeriodEmployeesData(this.prenominaPeriodEmployees)
  }

  getOperationData (abbreviation: string): any {
    return OPERATIONS_CATALOG_DATA.find((operation: any) => operation.abbreviation === abbreviation)
  }

  processPrenominaPeriodEmployeesData (prenominaPeriodEmployees: any[]) {
    // const days = this.getDaysForPeriod(this.dayOfPeriod, this._prenominaConfiguration)
    // prenominaPeriodEmployees.forEach(t=> console.table(t.prenominaPeriodEmployeeDays))
    // console.table(prenominaPeriodEmployees)
    return prenominaPeriodEmployees.map((prenominaPeriodEmployee: any) => {
      const fullname = (prenominaPeriodEmployee?.employee?.person?.name ? prenominaPeriodEmployee?.employee?.person?.name : ' ') + ' ' + (prenominaPeriodEmployee?.employee?.person?.lastName ? prenominaPeriodEmployee?.employee?.person?.lastName : '')
      prenominaPeriodEmployee.employeeName = fullname
      prenominaPeriodEmployee.clientService = prenominaPeriodEmployee?.employee?.clientService?.name

      
      // prenominaPeriodEmployee.days = []
      prenominaPeriodEmployee.prenominaPeriodEmployeeDays.forEach((day: any) => {
        const colDateName = this.getFormatDayForThisPeriod(day.date, 'weekly')
        const operationData = this.getOperationData(day.operationAbbreviation)
        prenominaPeriodEmployee[colDateName] = day.operationAbbreviation

        prenominaPeriodEmployee[colDateName + '_operation'] =  !!day.operationAbbreviation
        prenominaPeriodEmployee[colDateName + '_operationColor'] = operationData?.color

        prenominaPeriodEmployee[colDateName + '_operationComments'] =  day.operationComments
        prenominaPeriodEmployee[colDateName + '_operationConfirmComments'] =  day.operationConfirmComments
        
        // prenominaPeriodEmployee[]
        // dayOfWeek.toFormat('D')
        // prenominaPeriodEmployee.days.push({
        // day.date
        // day.id
        // day.operationAbbreviation
        // day.operationText
        // day.prenominaPeriodEmployeeId)
      })
      // console.log(prenominaPeriodEmployee)
      return prenominaPeriodEmployee
    })
  }

  getFormatDayForThisPeriod (date: Date, period: string) {
    const dateDateTime = DateTime.fromJSDate(new Date(date))
    return dateDateTime.toFormat('D')
  }

  getPrenominaPeriodEmployeeByPrenominaPeriodId (id: string) {
    return this.graphqlService.execute(prenominaPeriodEmployeesOperation, { prenominaPeriodId: id })
  }

  filterOptions: any[] = []
  filteredData: any[] = []
  setDataFiltered (filteredData: any) {
    this.filteredData = filteredData
  }

  async savePrenominaPeriodEmployee ($event: any) {
    const prenominaPeriodEmployee = await this.graphqlService.execute(updatePrenominaPeriodEmployeeOperation, $event)
    this.prenominaPeriodEmployees = this.prenominaPeriodEmployees.map((_prenominaPeriodEmployee: any) => {
      if (_prenominaPeriodEmployee.id === prenominaPeriodEmployee.id) {
        _prenominaPeriodEmployee = prenominaPeriodEmployee
      }
      return _prenominaPeriodEmployee
    })
    this.prenominaPeriodEmployeesData = this.processPrenominaPeriodEmployeesData(this.prenominaPeriodEmployees)
  }

  async exportFile (prenominaPeriod: any) {
    // this.httpClient.get(`${environment.rest_api_url}/prenomina/generate/` + prenominaPeriodId).subscribe(
    //   (response: any) => {
    //     window.open(response)
    //   }
    // )

    try {
      this.loading = true
      const response = await this.httpClient.get(`${environment.rest_api_url}/prenomina/generate/` + prenominaPeriod.id, { responseType: 'blob' }).toPromise()
      const file = new Blob([response], { type: 'application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      // const fileURL = URL.createObjectURL(file)
      // window.open(fileURL)
      fileSaver.saveAs(file, prenominaPeriod.name + '.xlsx')

      this.loading = false
    } catch (error: any) {
      this.notifyService.notify(this.translate.instant('messages.delete.error'), 'Error al generar el archivo.')
    }
  }

  @ViewChild(UploadFilesComponent) uploadFilesComponent!: UploadFilesComponent
  async uploadFile ($event: UploadFileModel, prenominaPeriodId: any) {
    const file: any = $event.data
    if (file) {
      try {

        await this.sendFile(file, prenominaPeriodId);
        this.uploadFilesComponent.cancelFile(file)
        this.uploadFilesComponent.cleanTemporalImages()
        await this.loadPrenominaPeriodEmployee(prenominaPeriodId)
        this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
      } catch (error) {
        console.error('Error al subir el archivo:', error);
      }
    }
  }

  async sendFile (file: File, prenominaPeriodId: string) {
    const formData = new FormData();
    formData.append('file', file, file.name);
  
    // Reemplaza la URL con la ruta de tu API y agrega el prenominaPeriodId 
    // TODO:  variable de entorno
    const apiUrl = `http://localhost:3001/prenomina/importExcel/${prenominaPeriodId}`
    
    return this.httpClient.post(apiUrl, formData).toPromise()
  }

  onFileComplete ($event: any) {
  }

  removeTemporalFile ($event: any) {

  }
}

/*
  name!: string // Client Name and real dates period
  date
  prenominaConfigurationId?: Types.ObjectId
  completed?: boolean
  totalVacancies?: number
*/
