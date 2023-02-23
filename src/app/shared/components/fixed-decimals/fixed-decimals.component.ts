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

    value = value.toFixed(2)

    this._value = this.formatNumberWithCommas(value)
  }

  @Output() outValue: EventEmitter<void> = new EventEmitter()

  constructor (private translate: TranslateService) {
  }

  ngOnInit () {
  }

  formatNumberWithCommas (num: number) {
    const parts = num.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }
}
