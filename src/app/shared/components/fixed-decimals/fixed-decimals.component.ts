/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable accessor-pairs */
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  templateUrl: './fixed-decimals.component.html',
  selector: 'fixed-decimals-component',
  styleUrls: ['./fixed-decimals.component.scss']
})
export class FixedDecimalsComponent implements OnInit {
  _value: string = ''
  @Input()
  set value (value: any) {
    if (typeof value === 'string') {
      value = Number(value)
    }
    value = value === null || value === undefined ? 0 : value

    const valueToLocale = value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })
    const partsOfValue = valueToLocale.split(',')
   
    this._value = partsOfValue[0].replace(/\./g, ',') + '.' + partsOfValue[1] //value.toFixed(2)
  }

  @Output() outValue: EventEmitter<void> = new EventEmitter()

  constructor (private translate: TranslateService) {
  }

  ngOnInit () {
  }
}
