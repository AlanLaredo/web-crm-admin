/* eslint-disable no-useless-constructor */
/* eslint-disable accessor-pairs */
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormControl } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { debounce } from 'lodash'

@Component({
  selector: 'data-filter-component',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.scss']
})
export class DataFilterComponent implements OnInit {
  optionsFormControl = new FormControl()
  public textInput: String = ''

  //  Input vars
  public _options: any = []
  public _dataSource: any = []
  public _dataFilterConfiguration: any = {
    hideSelectable: false
  }

  setDataSourceDebounce = debounce(this.setDataSource, 200)
  filterDataDebounce = debounce(this.filterData, 400)

  @Input()
  set dataSource (dataSource: any) {
    this.setDataSourceDebounce(dataSource)
    this.emitFilteredData(dataSource)
  }

  @Input()
  set options (options: any) {
    this._options = options
  }

  @Input()
  set dataFilterConfiguration (dataFilterConfiguration: any) {
    if (dataFilterConfiguration) {
      this._dataFilterConfiguration = { ...dataFilterConfiguration }
    }
  }

  @Output() filteredDataOut: EventEmitter<void> = new EventEmitter()

  constructor (
    public translate: TranslateService
  ) {
  }

  ngOnInit (): void {
  }

  emitFilteredData (filteredData: any) {
    this.filteredDataOut.emit(filteredData)
  }

  setDataSource (dataSource: any) : void {
    this._dataSource = dataSource
  }

  filterData () {
    let selectedOptions: any = []

    if (!this.optionsFormControl.value || this.optionsFormControl.value.length === 0) {
      selectedOptions = this._options
    } else {
      selectedOptions = this.optionsFormControl.value
    }

    const text = this.textInput.toLowerCase().trim()
    const filteredData = this._dataSource.filter((element: any) => {
      let exists = false
      selectedOptions.forEach((option: any) => {
        if (!exists) {
          const stringToSearch = String(element[option.key]).toLowerCase()
          if (!exists && stringToSearch.indexOf(text) >= 0) {
            exists = true
          }
        }
      })
      return exists
    })
    this.emitFilteredData(filteredData)
  }
}
