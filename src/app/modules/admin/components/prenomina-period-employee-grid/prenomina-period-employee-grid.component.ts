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
  _editable = true
  @Input('editable')
  set editable (editable: boolean) {
    this._editable = editable
  }

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
        // alert(result +'vs'+prenominaPeriodEmployee[typeDialog])

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
            // case 'nss': 

            case 'loan':
              {
                total = total - result + (prenominaPeriodEmployee[typeDialog] || 0)
                break
              }
              
          case 'double':
          case 'bonus':
          case 'salary':
          case 'loanDeposit':
          case 'holiday': {
            total = total + result - (prenominaPeriodEmployee[typeDialog] || 0)
            break
          }
        }
        
        prenominaPeriodEmployee[typeDialog] = result

        updateData.total = total
        updateData.differenceWithoutImss = total - (prenominaPeriodEmployee['nss'] || 0)
        // updateData.differenceWithoutImss = total - (prenominaPeriodEmployee['nss'] || 0)
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
