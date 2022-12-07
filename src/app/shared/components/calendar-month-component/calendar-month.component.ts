/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */
/* eslint-disable no-useless-constructor */

import { Component, Input, OnInit } from '@angular/core'
import { MatCalendarCellCssClasses } from '@angular/material/datepicker'
import { DateTime } from 'luxon'

@Component({
  selector: 'calendar-month-component',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss']
})
export class CalendarMonthComponent implements OnInit {
  calendarConfiguration: any[] = []
  _calendarDates: any[] = []

  @Input('calendarDates')
  set calendarDates (calendarDates: any[]) {
    if (calendarDates && calendarDates.length >= 1) {
      this._calendarDates = calendarDates
      this.processCalendarDates()
    }
  }

  constructor () { }

  ngOnInit () {
  }

  processCalendarDates () {
    this.calendarConfiguration = []
    this._calendarDates.forEach((calendarDate: any) => {
      calendarDate.dates.forEach((dateRow: any) => {
        const date = {
          date: dateRow.date,
          className: dateRow.className
        }
        this.calendarConfiguration.push(date)
      })
    })
  }

  dateClass () {
    return (date: Date): MatCalendarCellCssClasses => {
      const configurationRow = this.calendarConfiguration.filter(dateRow => dateRow.date === DateTime.fromJSDate(date).toFormat('yyyy-MM-dd'))

      // 'mat-calendar-date-danger'

      if (configurationRow.length >= 2 && configurationRow[0].className !== 'mat-calendar-date-danger') {
        return 'mat-calendar-date-maintenance-monitoring'
      } else if (configurationRow.length >= 2 && configurationRow[0].className === 'mat-calendar-date-danger') {
        return 'mat-calendar-date-danger'
      } else if (configurationRow.length === 1) {
        return configurationRow[0].className
      } else {
        return ''
      }
    }
  }
}
