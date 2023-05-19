/* eslint-disable no-useless-constructor */
// Third Party
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

import { Component, Input, Output, ViewChild, EventEmitter, AfterViewInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'

import { InputModalComponent } from 'src/app/shared/components/input-modal'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'generic-grid-v2-component',
  templateUrl: './generic-grid-v2.component.html',
  styleUrls: ['./generic-grid-v2.component.scss']
})
export class GenericGridv2Component<T> implements AfterViewInit {
  @Input('data')
  set data (data: T[]) {
    console.log(data)
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
      this.updateElements()
    }
  }

  
  @Input('buttons') _buttons: any[] = []

  @Output()
  outAction: EventEmitter<any> = new EventEmitter<any>()
  
  @Output()
  outActionColumnEdit: EventEmitter<any> = new EventEmitter<any>()

  _data: any[] = [
    {
      key: 'name',
      display: 'catalogs.cols.name',
      type: 'text'
    }
  ]

  _columns: any[] = []
  buttons: any[] = []

  displayedColumns: string[] = this._columns.map(column => column.key)
  dataSource: any

  @ViewChild(MatPaginator) paginator: any
  @ViewChild(MatSort) sort: any

  constructor (
    public translate: TranslateService,
    private dialog: MatDialog
  ) {
  }

  ngAfterViewInit (): void {
    this.updateElements()
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

  // MARK A ROW
  shouldHighlight(row: any): boolean {
    return row.itemsInStock <= row.reorderPoint
  }

  onClickAction (button: string, row: any) {
    this.outAction.emit({ button, row })
  }

  async openDialogEdit (keyColumn: any, row: any) {
    const column: any = this._columns.find(column => column.key === keyColumn)
    const data: any = {}

    data.title = this.translate.instant('actions.edit')
    data.inputName = column.display
    data.instructions = this.translate.instant('form.instructions.editValue')
    // data.info = this.translate.instant('operationBinnacle.infoHours')

    data.required = false
    data.type = column.type === 'money' || column.type === 'number'
    ? 'number'
    : 'text'

    data.value = column.type === 'money' || column.type === 'number'
      ? Number(row[column.key] || 0)
      : row[column.key]

      const dialog = this.dialog.open(InputModalComponent, {
      width: '400px',
      disableClose: false,
      data
    })

    let result = await dialog.afterClosed().toPromise()
    if (result !== undefined) {
      result = column.type === 'money' || column.type === 'number'
      ? Number(result || 0)
      : result

      this.outActionColumnEdit.emit({
        id: row.id,
        keyColumn,
        newValue: result ? result : null,
        oldValue: row[column.key],
        row
      })
    }
  }

    formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  // columnAmountDistributable: any = []
  onSliderChange (column: any, row: any, $event: any) {
    this.outActionColumnEdit.emit({
      id: row.id,
      keyColumn: column.key,
      newValue: $event.value,
      oldValue: row[column.key],
      row
    })
    // if (column.isAmountDistributable) {
    //   // this.columnAmountDistributable[column.key] = column.max - this.calculateAvailableMax(column.key) //row.bagsPercentage
    // }
  }

  // calculateAvailableMax (columnKey: string) {
  //   let total = 0
  //   this._data.forEach(row => {
  //     total = total + row[columnKey]
  //   })
  //   return total
  // }

  get columnWidth(): number {
    const baseWidth = 40
    const buttonWidth = 60
    const buttonCount = this._buttons.length
    return buttonCount > 0 ? baseWidth + buttonWidth * buttonCount : 0
  }
}
