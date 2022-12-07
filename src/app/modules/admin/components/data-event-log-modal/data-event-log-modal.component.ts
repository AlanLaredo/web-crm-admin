/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

// Third Party
import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { DateTime } from 'luxon'
import { UsersGqlService } from 'src/app/modules/security/services'
import { IUser } from 'src/app/shared/interfaces'

@Component({
  selector: 'data-event-log-modal-component',
  templateUrl: './data-event-log-modal.component.html',
  styleUrls: ['./data-event-log-modal.component.scss']
})
export class DataEventLogModalComponent {
  _data: any
  constructor (
    public translate: TranslateService,
    public userService: UsersGqlService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<any>
  ) {
    this._data = {
      createdAtString: DateTime.fromJSDate(new Date(data.createdAt)).setLocale(this.translate.instant('lang.luxon')).toFormat('DDDD\',\' hh:mm a'),
      modifiedAtString: DateTime.fromJSDate(new Date(data.modifiedAt)).setLocale(this.translate.instant('lang.luxon')).toFormat('DDDD\',\' hh:mm a')
    }
    if (data.clientEmail) {
      this._data.clientEmail = data.clientEmail
    }
    if (data.clientContactNumber) {
      this._data.clientContactNumber = data.clientContactNumber
    }
    this.loadData()
  }

  loadData () {
    const createdBy: string = String(this.data.createdBy)
    this.userService.getOne(createdBy).then((result: IUser) => {
      if (result) {
        this._data.createdByName = result.firstName + ' ' + (result.lastName ? result.lastName : '')
      }
    })

    const modifiedBy: string = String(this.data.modifiedBy)
    if (this.data.modifiedBy) {
      this.userService.getOne(modifiedBy).then((result: IUser) => {
        if (result) {
          this._data.modifiedByName = result.firstName + ' ' + (result.lastName ? result.lastName : '')
        }
      })
    }
  }

  onNoClick (): void {
    this.dialogRef.close()
  }
}
