// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { DateTime } from 'luxon'

import { employeesInOperationOperation } from 'src/app/shared/operations/queries'
import { OPERATIONS_CATALOG_DATA } from '../../data'
import { MatDialog } from '@angular/material/dialog'
import { OperationFormModalComponent } from '../../components/operation-form-modal/'
import { createOperation, updateOperation } from 'src/app/shared/operations/mutations'
import { LoginService } from 'src/app/modules/auth/services'
import Swal from 'sweetalert2'
import { InputModalComponent } from 'src/app/shared/components/input-modal'

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

    this.columns = [...this.columns, ...this.daysOfWeek.map(date => ({
      key: date.toFormat('D'),
      text: this.capitalize(date.weekdayLong) + ' ' + date.setLocale(this.translate.instant('lang.luxon')).toFormat('d')
    }))]
  }

  async loadData () {
    this.loading = true
    this.data = await this.graphqlService.execute(employeesInOperationOperation)
    this.loading = false

    this.data = this.data.map((employee: any) => {
      employee.clientBusinessName = employee.client.businessName

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
          employee.restDay = foundOperation.restDay
          employee.workshift = foundOperation.workshift
          employee.hours = foundOperation.hours
        } else {
          employee[dayOfWeek.toFormat('D')] = { date: dayOfWeek.toJSDate(), dateTime: dayOfWeek, employeeId: employee.id }
        }
      })

      // employee.restDay = employee.operations.restDay
      // employee.workshift = employee.operations.workshift
      // employee.hours = employee.operations.hours

      // date
      // operation
      // operationConfirm
      // operationModifiedBy
      // operationConfirmModifiedBy
      employee.fullname = employee.person.name + ' ' + employee.person.lastName ? employee.person.lastName : ''
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
    this.filteredData = filteredData
  }

  openDialogInicidence () {
  }

  onChangeDate ($event: any) {
    const date = $event.value || $event
    if (date) {
      const firstDayOfWeek = DateTime.fromJSDate(new Date(date))
      if (firstDayOfWeek) {
        this.daysOfWeek = this.configDatesOfWeek(firstDayOfWeek)
        this.setDatesInfo(firstDayOfWeek)
        this.loadTranslations()
        this.loadData()
      }
    }
  }

  setDatesInfo (firstDayOfWeek: DateTime) {
    const endDay: DateTime = firstDayOfWeek.plus({ days: 6 })
    if (firstDayOfWeek.monthLong !== endDay.monthLong) {
      this.datesInfo = this.capitalize(firstDayOfWeek.monthLong) + ' ' + firstDayOfWeek.year + ' - ' + this.capitalize(endDay.monthLong) + ' ' + endDay.year
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
    console.log('keydownOff')
    console.log($event)
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
    const dialogRef = this.dialog.open(OperationFormModalComponent, {
      width: '900px',
      disableClose: false,
      data: {
        abbreviation,
        operations: OPERATIONS_CATALOG_DATA
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.abbreviation !== abbreviation) {
          const { dateTime, operationColor, operationConfirmColor, text, textConfirm, ...updateOperation } = operation
          _function === 'operation' ? updateOperation.operation = result.abbreviation : updateOperation.operationConfirm = result.abbreviation
          _function === 'operation' ? updateOperation.operationModifiedBy = this.user._id : updateOperation.operationConfirmModifiedBy = this.user._id
          console.log(updateOperation)
          this.saveOperation(updateOperation)
        }
      }
    })
  }

  async saveOperation (data: any) {
    this.loading = true

    this.graphqlService.execute(data && data.id ? updateOperation : createOperation, data).then(
      async (response: any) => {
        this.loading = false
        if (data.id) {
          this.notifyService.notify(this.translate.instant('messages.save.success'), 'success')
        } else {
          this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
        }
        this.loadData()
      },
      () => {
        this.notifyService.notify(this.translate.instant('messages.update.error'), 'error')
        this.loading = false
      }
    )
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
        data.value = employee.restDay
        data.catalogForSelect = this.daysOfWeek.map((date: DateTime) => ({
          value: date.toJSDate(),
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
        data.value = employee.hours
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

    dialog.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const updateOperations: any[] = []

        if (typeDialog === 'workshift' || typeDialog === 'hours') {
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
              foundOperation[typeDialog] = result
              updateOperations.push(newOperation)
            }
          })
        } else if (typeDialog === 'restDay') {
          this.daysOfWeek.forEach((dayOfWeek: DateTime) => {
            const foundOperation = employee.operations.find((operation: any) => {
              const operationDate = DateTime.fromJSDate(new Date(operation.date))
              return operationDate.equals(dayOfWeek)
            })
            if (foundOperation) {
              const restDayDateTime: DateTime = DateTime.fromJSDate(new Date(result))
              const foundOperationForRestDay = employee.operations.find((operation: any) => {
                const operationDate = DateTime.fromJSDate(new Date(operation.date))
                return operationDate.equals(restDayDateTime)
              })

              if (foundOperationForRestDay !== undefined && foundOperation.id === foundOperationForRestDay.id) {
                foundOperation[typeDialog] = restDayDateTime.toJSDate()
              } else {
                foundOperation[typeDialog] = null
              }

              updateOperations.push({ ...foundOperation })
            }
          })
        }

        console.log('updateOperations')
        console.log(updateOperations)
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
