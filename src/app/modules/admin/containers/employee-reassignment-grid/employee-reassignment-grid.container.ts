// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'

import { employeeReassignmentsOperation } from 'src/app/shared/operations/queries'
import { ActivatedRoute, Router } from '@angular/router'
import { DateTime } from 'luxon'
import { LoginService } from 'src/app/modules/auth/services'

@Component({
  templateUrl: './employee-reassignment-grid.container.html',
  styleUrls: ['./employee-reassignment-grid.container.scss']
})
export class EmployeeReassignmentGridContainer implements OnInit {
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
    public loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('submenu.reassignment') + ' - ' + this.translate.instant('applicationTitle'))
    const params = this.activatedRoute.snapshot.params
    this.loadTranslations()
    this.clientId = params.elementId
    this.loadData()
  }

  loadData () {
    this.loading = true
    this.graphqlService.execute(employeeReassignmentsOperation, { clientId: this.clientId }).then((result: any) => {
      this.loading = false
      this.data = result.map((employeeReassignment: any) => {
        employeeReassignment.employeName = employeeReassignment.employee.person.name + ' ' + (employeeReassignment.employee.person.lastName ? employeeReassignment.employee.person.lastName : ' ')
        employeeReassignment.transmitterClientName = employeeReassignment.transmitterClient.businessName ? employeeReassignment.transmitterClient.businessName : 'N/a'
        employeeReassignment.receiverClientName = employeeReassignment.receiverClient.businessName ? employeeReassignment.receiverClient.businessName : 'N/a'
        employeeReassignment.date = DateTime.fromJSDate(new Date(employeeReassignment.createdAt)).setLocale(this.translate.instant('lang.luxon')).toFormat('DDDD\',\' hh:mm a')
        return employeeReassignment
      })
      this.setDataFiltered(this.data)
    })
  }

  setDataFiltered (filteredData: any) {
    this.filteredData = filteredData
  }

  loadTranslations () {
    this.filterOptions = [
      {
        key: 'employeName',
        text: this.translate.instant('reassignment.employee')
      },
      {
        key: 'transmitterClientName',
        text: this.translate.instant('reassignment.from')
      },
      {
        key: 'receiverClientName',
        text: this.translate.instant('reassignment.to')
      },
      {
        key: 'date',
        text: this.translate.instant('reassignment.date')
      },
      {
        key: 'reason',
        text: this.translate.instant('reassignment.reason')
      }
    ]

    this.columns = this.filterOptions.map((column: any) => {
      column.id = column.key
      column.name = column.text
      return column
    })
    // this.columns.push({
    //   id: 'actions',
    //   name: this.translate.instant('general.actions')
    // })
  }
}
