// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { DateTime } from 'luxon'

import { employeesInOperationOperation, operationSendEmail } from 'src/app/shared/operations/queries'
import { OPERATIONS_CATALOG_DATA } from '../../data'
import { MatDialog } from '@angular/material/dialog'
import { OperationFormModalComponent } from '../../components/operation-form-modal/'
import { createOperation, updateOperation } from 'src/app/shared/operations/mutations'
import { LoginService } from 'src/app/modules/auth/services'
import { InputModalComponent } from 'src/app/shared/components/input-modal'
import { IncidenceFormModalComponent } from '../../components'

@Component({
  templateUrl: './operation-binnacle-grid.container.html',
  styleUrls: ['./operation-binnacle-grid.container.scss']
})
export class OperationBinnacleGridContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  data: any[] = []
  filteredData: any[] = []
  columns: any[] = []
  dateString: string = ''
  daysOfWeek: DateTime[] = []
  datesInfo: string = ''
  user: any = {}
  todayStringCol = DateTime.now().toFormat('D')


  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private notifyService: NotifyService,
    private loginService: LoginService,
    private dialog: MatDialog,
    private titleService: Title,
    private graphqlService: GraphqlService
  ) {
    this.user = this.loginService.getUser()
  }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('submenu.operationBinnacle') + ' - ' + this.translate.instant('applicationTitle'))
    const today: DateTime = DateTime.now()

    const firstDayOfWeek = today.startOf('week')
    this.dateString = firstDayOfWeek.toJSDate().toISOString()
    this.onChangeDate(firstDayOfWeek)
  }

  loadTranslations () {
    this.filterOptions = [
      { key: 'clientBusinessName', text: this.translate.instant('operationBinnacle.clientBusinessName') },
      { key: 'clientService', text: this.translate.instant('operationBinnacle.clientService') },
      { key: 'fullname', text: this.translate.instant('operationBinnacle.fullname') },
      { key: 'restDay', text: this.translate.instant('operationBinnacle.restDay') },
      { key: 'workshift', text: this.translate.instant('operationBinnacle.workshift') },
      { key: 'hours', text: this.translate.instant('operationBinnacle.hours') },
      { key: 'phone', text: this.translate.instant('operationBinnacle.phone') },
      { key: 'startOperationDateString', text: this.translate.instant('operationBinnacle.startOperationDateString') }
    ]

    this.columns = this.filterOptions.map((column: any) => {
      // column.id = column.key
      // column.name = column.text
      return column
    })

    this.columns = [...this.columns, ...this.daysOfWeek.map(date => {
      const dateName = this.capitalize(date.weekdayLong) + ' ' + date.setLocale(this.translate.instant('lang.luxon')).toFormat('d')
      return {
        key: date.toFormat('D'),
        text: dateName.split(' ')[0],
        extra: dateName.split(' ')[1]
      }
    })]
  }

  async loadData () {
    this.loading = true
    this.data = await this.graphqlService.execute(employeesInOperationOperation, { operationStartDate: '2023-04-02' })
    this.loading = false

    this.data = this.data.map((employee: any) => {
      employee.clientBusinessName = employee.client?.businessName || 'N/A'
      employee.clientService = employee.clientService?.name || 'N/A'

      this.daysOfWeek.forEach((dayOfWeek: DateTime) => {
        const foundOperation = employee.operations.find((operation: any) => {
          const operationDate = DateTime.fromJSDate(new Date(operation.date))
          return operationDate.equals(dayOfWeek)
        })

        if (foundOperation) {
          const date = DateTime.fromJSDate(new Date(foundOperation.date))
          const operation = this.getOperationData(foundOperation.operation)
          const operationConfirm = this.getOperationData(foundOperation.operationConfirm)
          employee[dayOfWeek.toFormat('D')] = {
            ...foundOperation,
            dateTime: date
          }
          if (operation) {
            employee[dayOfWeek.toFormat('D')].operationColor = operation.color
            employee[dayOfWeek.toFormat('D')].text = operation.text
          }
          if (operationConfirm) {
            employee[dayOfWeek.toFormat('D')].operationConfirmColor = operationConfirm.color
            employee[dayOfWeek.toFormat('D')].textConfirm = operationConfirm.text
          }
          employee.workshift = foundOperation.workshift
          employee.hours = foundOperation.hours

          const restDayDateTime: DateTime = DateTime.fromJSDate(new Date(foundOperation.restDay))
          if (restDayDateTime.equals(dayOfWeek)) {
            employee.restDay = restDayDateTime.toFormat('D')
            employee.restDayDateTime = restDayDateTime
          }
        } else {
          employee[dayOfWeek.toFormat('D')] = { date: dayOfWeek.toJSDate(), dateTime: dayOfWeek, employeeId: employee.id }
        }
      })
      employee.fullname = employee.person.name + ' ' + (employee.person.lastName ? employee.person.lastName : '')
      employee.phone = employee.person.phoneContacts && employee.person.phoneContacts.length > 0 ? employee.person.phoneContacts[0] : 'N/A'
      employee.startOperationDateString = employee.startOperationDate ? DateTime.fromJSDate(new Date(employee.startOperationDate)).setLocale(this.translate.instant('lang.luxon')).toFormat('DDD') : 'N/A'
      return employee
    })
    this.setDataFiltered(this.data)
  }

  getOperationData (abbreviation: string): any {
    return OPERATIONS_CATALOG_DATA.find((operation: any) => operation.abbreviation === abbreviation)
  }

  setDataFiltered (filteredData: any) {
    console.log(filteredData)
    this.filteredData = filteredData
  }

  openDialogInicidence () {
    const dialogRef = this.dialog.open(IncidenceFormModalComponent, {
      width: '900px',
      disableClose: false,
      data: {}
    })
    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        const date = new Date(result.date)
        const incidence = result
        incidence.date = DateTime.fromJSDate(date).toFormat('DDDD')
        if (result.destination === 1) {
          this.sendMessageToWhatsApp(incidence)
        } else {
          this.sendMessageToEmail(incidence)
        }
      }
    })
  }

  sendMessageToWhatsApp (incidence: any) {
    let urlMessage = 'https://api.whatsapp.com/send?phone=528132657969&text=Central%20de%20Radio%20informa.'
    urlMessage += '%0AFecha%3A' + incidence.date
    urlMessage += '%0AGenerales%3A' + incidence.generalComments
    urlMessage += '%20%0AServicio%3A' + incidence.serviceComments
    urlMessage += '%20%20%0ASupervisor%3A' + incidence.supervisorComments
    urlMessage += '%0AEvento%3A' + incidence.eventComments
    urlMessage += '%0ACoordinaci%C3%B3n%3A' + incidence.coordinationComments
    urlMessage += '%0ASeguimiento%20y%20Conclusi%C3%B3n%3A' + incidence.followAndConclusionComments
    urlMessage += '%0AMas%20datos%3A' + incidence.moreComments
    urlMessage += '&app_absent=1'
    window.open(urlMessage, '_blank')
  }

  async sendMessageToEmail (incidence: any) {
    let message: string = ''
    message += '\n Fecha: ' + incidence.date
    message += '\n Generales: ' + incidence.generalComments
    message += '\n Servicio: ' + incidence.serviceComments
    message += '\n Supervisor: ' + incidence.supervisorComments
    message += '\n Evento: ' + incidence.eventComments
    message += '\n Coordinación: ' + incidence.coordinationComments
    message += '\n SeguimientoyConclusión: ' + incidence.followAndConclusionComments
    message += '\n Mas datos: ' + incidence.moreComments

    message = message.toString()
    const result = await this.graphqlService.execute(operationSendEmail, {
      message
    })
  }

  onChangeDate ($event: any) {
    const date = $event.value || $event
    if (date) {
      const dateOfWeek = DateTime.fromJSDate(new Date(date))
      if (dateOfWeek) {
        this.daysOfWeek = this.configDatesOfWeek(dateOfWeek)
        this.setDatesInfo(dateOfWeek)
        this.loadTranslations()
        this.loadData()
      }
    }
  }

  setDatesInfo (dateOfWeek: DateTime) {
    const endDay: DateTime = dateOfWeek.plus({ days: 6 })
    if (dateOfWeek.monthLong !== endDay.monthLong) {
      this.datesInfo = this.capitalize(dateOfWeek.monthLong) + ' ' + dateOfWeek.year + ' - ' + this.capitalize(endDay.monthLong) + ' ' + endDay.year
    } else {
      this.datesInfo = this.capitalize(endDay.monthLong) + ' ' + endDay.year
    }
  }

  capitalize (word: string) {
    const textArray = word.split('')
    textArray[0] = textArray[0].toUpperCase()
    return textArray.join('')
  }

  keydownOff ($event: any) {
    return false
  }

  weekendsDatesFilter = (d: Date | null) => {
    const day = d?.getDay()
    return day === 1
  }

  configDatesOfWeek (startDayOfWeek: DateTime): DateTime[] {
    return Array.from(Array(7).keys()).map((element: number, index: number) => startDayOfWeek.plus({ days: index }))
  }

  openDialogOperation ($event: any) {
    const { employee, _function, operation } = $event
    const abbreviation = _function === 'operation' ? operation.operation : operation.operationConfirm
    const comment = _function === 'operation' ? operation.operationComments : operation.operationConfirmComments
    const hours = _function === 'operation' ? operation.operationHours : operation.operationConfirmHours

    const dialogRef = this.dialog.open(OperationFormModalComponent, {
      width: '900px',
      disableClose: false,
      data: {
        abbreviation,
        comment,
        hours,
        operations: OPERATIONS_CATALOG_DATA
      }
    })
    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        if (result.abbreviation !== abbreviation || result.comment !== comment || result.hours !== hours) {
          const { dateTime, operationColor, operationConfirmColor, text, textConfirm, ...updateOperation } = operation
          _function === 'operation' ? updateOperation.operation = result.abbreviation : updateOperation.operationConfirm = result.abbreviation
          _function === 'operation' ? updateOperation.operationModifiedBy = this.user._id : updateOperation.operationConfirmModifiedBy = this.user._id
          _function === 'operation' ? updateOperation.operationComments = result.comment : updateOperation.operationConfirmComments = result.comment
          _function === 'operation' ? updateOperation.operationHours = Number(result.hours) : updateOperation.operationConfirmHours = Number(result.hours)
          this.loading = true
          const response = await this.saveOperation(updateOperation)
          if (response.id) {
            this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
          }
          this.loading = false

          this.loadData()
        }
      }
    })
  }

  async saveOperation (data: any) {
    return this.graphqlService.execute(data && data.id ? updateOperation : createOperation, data)
  }

  openDialog ($event: any) {
    const { typeDialog, employee } = $event
    const data: any = {}
    switch (typeDialog) {
      case 'restDay':
        data.title = this.translate.instant('operationBinnacle.titleRestDay')
        data.inputName = this.translate.instant('operationBinnacle.restDay')
        data.instructions = this.translate.instant('form.instructions.selectAnOption')
        data.info = this.translate.instant('operationBinnacle.infoRestDay')
        data.required = false
        data.type = 'select'
        data.value = employee.restDayDateTime?.setLocale(this.translate.instant('lang.luxon')).toFormat('D') || null
        data.catalogForSelect = this.daysOfWeek.map((date: DateTime) => ({
          value: date.setLocale(this.translate.instant('lang.luxon')).toFormat('D'),
          label: date.setLocale(this.translate.instant('lang.luxon')).toFormat('DDDD')
        }))
        break
      case 'workshift':
        data.title = this.translate.instant('operationBinnacle.titleWorkshift')
        data.inputName = this.translate.instant('operationBinnacle.workshift')
        data.instructions = this.translate.instant('form.instructions.enterAText')
        data.info = this.translate.instant('operationBinnacle.infoWorkhift')
        data.required = false
        data.type = 'text'
        data.value = employee.workshift
        break
      case 'hours':
        data.title = this.translate.instant('operationBinnacle.titleHours')
        data.inputName = this.translate.instant('operationBinnacle.hours')
        data.instructions = this.translate.instant('form.instructions.enterANumber')
        data.info = this.translate.instant('operationBinnacle.infoHours')
        data.required = false
        data.type = 'select'
        data.value = Number(employee.hours)
        data.catalogForSelect = Array.from(Array(24).keys()).map((element: number) => ({
          value: element + 1,
          label: element + 1
        }))
        break
    }

    const dialog = this.dialog.open(InputModalComponent, {
      width: '400px',
      disableClose: false,
      data
    })

    dialog.afterClosed().subscribe(async (result: any) => {
      if (result !== undefined) {
        const updateOperations: any[] = []

        if (typeDialog === 'workshift' || typeDialog === 'hours') {
          result = result?.toString() || null
          this.daysOfWeek.forEach((dayOfWeek: DateTime) => {
            const foundOperation = employee.operations.find((operation: any) => {
              const operationDate = DateTime.fromJSDate(new Date(operation.date))
              return operationDate.equals(dayOfWeek)
            })
            if (foundOperation) {
              foundOperation[typeDialog] = result
              updateOperations.push({ ...foundOperation })
            } else {
              const newOperation: any = { date: dayOfWeek.toJSDate(), employeeId: employee.id }
              newOperation[typeDialog] = result
              updateOperations.push(newOperation)
            }
          })
        } else if (typeDialog === 'restDay') {
          if (!result) {
            this.daysOfWeek.forEach((dayOfWeek: DateTime) => {
              const foundOperation = employee.operations.find((operation: any) => {
                const operationDate = DateTime.fromJSDate(new Date(operation.date))
                return operationDate.equals(dayOfWeek)
              })
              if (foundOperation) {
                updateOperations.push({ ...foundOperation, restDay: null })
              }
            })
          } else {
            const splitDate = result?.split('/')
            const restDayDateTime: DateTime = DateTime.fromObject({ year: splitDate[2], month: splitDate[1], day: splitDate[0] })
            const foundOperationForRestDay = employee.operations.find((operation: any) => {
              const operationDate = DateTime.fromJSDate(new Date(operation.date))
              return operationDate.equals(restDayDateTime)
            })

            if (foundOperationForRestDay === undefined) {
              const newOperation: any = { date: restDayDateTime.toJSDate(), restDay: restDayDateTime.toJSDate(), employeeId: employee.id }
              updateOperations.push(newOperation)
            } else {
              updateOperations.push({ ...foundOperationForRestDay, restDay: restDayDateTime.toJSDate() })
            }

            this.daysOfWeek.forEach((dayOfWeek: DateTime) => {
              const foundOperation = employee.operations.find((operation: any) => {
                const operationDate = DateTime.fromJSDate(new Date(operation.date))
                return operationDate.equals(dayOfWeek) && !operationDate.equals(restDayDateTime)
              })
              if (foundOperation) {
                updateOperations.push({ ...foundOperation, restDay: null })
              }
            })
          }
        }
        if (updateOperations && updateOperations.length > 0) {
          await Promise.all(updateOperations.map(element => this.saveOperation(element)))
          this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
          this.loadData()
        }
      }
    })
  }
  // async saveEmployee ($event: any) {
  //   const data = $event
  //   this.loading = true

  //   this.graphqlService.execute(updateEmployeeOperation, data).then(
  //     async (response: any) => {
  //       this.loading = false
  //     },
  //     () => {
  //       this.notifyService.notify(this.translate.instant('messages.update.error'), 'error')
  //       this.loading = false
  //     }
  //   )
  // }
}
