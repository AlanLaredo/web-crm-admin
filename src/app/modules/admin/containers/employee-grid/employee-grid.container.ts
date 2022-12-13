// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'

import { employeesOperation } from 'src/app/shared/operations/queries'
import { deleteEmployeeOperation } from 'src/app/shared/operations/mutations'

@Component({
  templateUrl: './employee-grid.container.html',
  styleUrls: ['./employee-grid.container.scss']
})
export class EmployeeGridContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  data: any[] = []
  filteredData: any[] = []
  columns: any[] = []

  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private notifyService: NotifyService,
    private titleService: Title,
    private graphqlService: GraphqlService
  ) { }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('submenu.employee') + ' - ' + this.translate.instant('applicationTitle'))

    this.loadTranslations()
    this.loadData()
  }

  loadTranslations () {
    this.filterOptions = [
      { key: 'companyName', text: this.translate.instant('employee.company') },
      { key: 'keycode', text: this.translate.instant('employee.keycode') },
      { key: 'personName', text: this.translate.instant('employee.personName') },
      { key: 'positionName', text: this.translate.instant('employee.positionName') },
      { key: 'hiringDate', text: this.translate.instant('employee.hiringDate') },
      { key: 'startOperationDate', text: this.translate.instant('employee.startOperationDate') },
      { key: 'clientName', text: this.translate.instant('employee.clientName') }
    ]

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

  loadData () {
    this.loading = true
    this.graphqlService.execute(employeesOperation).then((result: any) => {
      this.loading = false
      this.data = result
      this.data.map((employee: any) => {
        employee.category = employee.name
        return employee
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
      this.graphqlService.execute(deleteEmployeeOperation, { id }).then(
        (result: any) => {
          this.loading = false
          this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
          this.loadData()
        }
      )
    }
  }
}
