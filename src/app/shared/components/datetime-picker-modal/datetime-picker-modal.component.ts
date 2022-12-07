/* eslint-disable no-useless-constructor */
/* eslint-disable accessor-pairs */
import { Component, Inject } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'
import { DateTime } from 'luxon'

@Component({
  selector: 'datetime-picker-modal-component',
  templateUrl: './datetime-picker-modal.component.html',
  styleUrls: ['./datetime-picker-modal.component.scss']
})
export class DatetimePickerModalComponent {
  _loading: boolean = false
  _data: any = null
  minDate: any = null
  maxDate: any = null
  public formBuilderGroup: any = null

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<DatetimePickerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this._data = data
    }
    this.initForm()
  }

  initForm () {
    let date
    if (this._data.date) {
      date = DateTime.fromISO(this._data.date).toFormat('yyyy-MM-dd\'T\'HH:mm')
    } else {
      date = DateTime.now().toFormat('yyyy-MM-dd\'T\'HH:mm')
    }
    if (this._data.minDate) {
      this.minDate = DateTime.fromJSDate(new Date(this._data.minDate)).toFormat('yyyy-MM-dd\'T\'HH:mm')
    }
    if (this._data.maxDate) {
      this.maxDate = DateTime.fromJSDate(new Date(this._data.maxDate)).toFormat('yyyy-MM-dd\'T\'HH:mm')
    }
    this.formBuilderGroup = this.formBuilder.group({
      date: new FormControl((date), [
        Validators.required
      ])
    })
  }

  onNoClick (): void {
    this.dialogRef.close()
  }

  submit () {
    if (!this.formBuilderGroup.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const utcdate = DateTime.fromJSDate(new Date(this.formBuilderGroup.value.date)).toUTC().toISO()
    this.dialogRef.close(utcdate)
  }

  public clearStartDate () {
    this.formBuilderGroup.controls.date.setValue(null)
  }
}
