/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */
// Third Party
import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { InputModalComponent } from 'src/app/shared/components/input-modal'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'prenomina-period-employee-grid-component',
  templateUrl: './prenomina-period-employee-grid.component.html',
  styleUrls: ['./prenomina-period-employee-grid.component.scss']
})
export class PrenominaPeriodEmployeeGridComponent {
  @Input('data')
  set data (data: any[]) {
    if (data !== null) {
      this._data = data
      this.loadData()
    }
  }

  @Input('columns')
  set columns (columns: any[]) {
    if (columns !== null) {
      this._columns = columns
      this.displayedColumns = this._columns.map(column => column.key)
    }
  }

  @Output()
  outActionSave: EventEmitter<any> = new EventEmitter<any>()

  _data: any[] = []
  _columns: any[] = []
  dataSource: any
  displayedColumns: string[] = []

  @ViewChild(MatPaginator) paginator: any
  @ViewChild(MatSort) sort: any

  constructor (
    public translate: TranslateService,
    private dialog: MatDialog
  ) {
  }

  loadData () {
    this.dataSource = new MatTableDataSource<any>(this._data)
    this.updateElements()
  }

  updateElements () {
    if (this.paginator !== undefined) {
      this.paginator._intl.itemsPerPageLabel = this.translate.instant('matTable.paginator.perPage')
      this.dataSource.paginator = this.paginator
    }
    if (this.sort !== undefined) {
      this.dataSource.sort = this.sort
    }
  }

  openDialog (typeDialog: any, prenominaPeriodEmployee: any) {
    const data: any = {}

    data.title = this.translate.instant('actions.edit')
    data.info = this.translate.instant('actions.edit') + ' ' + this.translate.instant('periods.cols.' + typeDialog)
    data.inputName = this.translate.instant('periods.cols.' + typeDialog)
    data.instructions = this.translate.instant('form.instructions.enterANumber')

    data.required = false
    data.type = 'number'
    data.value = prenominaPeriodEmployee[typeDialog]

    const dialog = this.dialog.open(InputModalComponent, {
      width: '400px',
      disableClose: false,
      data
    })

    dialog.afterClosed().subscribe(async (result: number) => {
      if (result !== undefined) {
        let total = prenominaPeriodEmployee.total
        result = Number(result)
        prenominaPeriodEmployee[typeDialog] = result

        const updateData: any = {
          id: prenominaPeriodEmployee.id
        }
        updateData[typeDialog] = result

        switch (typeDialog) {
          case 'saving':
          case 'uniforms':
          case 'advance':
          case 'infonavit':
          case 'fonacot':
          case 'loan':
          case 'nss': {
            total = total - result
            break
          }

          case 'double':
          case 'bonus':
          case 'holiday': {
            total = total + result
            break
          }
        }
        updateData.total = total
        prenominaPeriodEmployee = await this.savePrenominaPeriodEmployee(updateData)
        // const updateOperations: any[] = []
        // this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
      }
    })
  }

  async savePrenominaPeriodEmployee (prenominaPeriodEmployee: any) {
    return this.outActionSave.emit(prenominaPeriodEmployee)
  }
}
