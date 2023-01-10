/* eslint-disable no-useless-constructor */
/* eslint-disable accessor-pairs */
import { Component, Inject } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { DateTime } from 'luxon'
// import { DateTime } from 'luxon'
import Swal from 'sweetalert2'

@Component({
  selector: 'input-modal-component',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss']
})
export class InputModalComponent {
  _loading: boolean = false
  _data: any = {
    title: '',
    info: '',
    inputName: '',
    instructions: '',
    required: true,
    type: '',
    catalogForSelect: [],
    value: null,
    disabled: false
  }

  public formBuilderGroup: any = null

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<InputModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      if (data.title) {
        this._data.title = data.title
      }

      if (data.inputName) {
        this._data.inputName = data.inputName
      }

      if (data.instructions) {
        this._data.instructions = data.instructions
      }

      if (data.info) {
        this._data.info = data.info
      }

      if (data.required !== undefined) {
        this._data.required = data.required
      }

      if (data.type) {
        this._data.type = data.type
      }

      if (data.value !== undefined) {
        this._data.value = data.value
      }

      if (data.aditionalButtons) {
        this._data.aditionalButtons = data.aditionalButtons
      }

      if (data.catalogForSelect) {
        this._data.catalogForSelect = data.catalogForSelect
      }

      if (data.disabled !== undefined) {
        this._data.disabled = data.disabled
      }
    }
    this.initForm()
  }

  initForm () {
    let value = this._data.value

    if (this._data.type === 'datetime-local') {
      value = DateTime.fromJSDate(
        new Date(this._data.value ? this._data.value : new Date())).set({ millisecond: 0, second: 0 }).setLocale(this.translate.instant('lang.luxon')
      ).toISO({ includeOffset: false, suppressMilliseconds: true, suppressSeconds: true, format: 'extended' })
    }
    const validations = []
    if (this._data.required) {
      validations.push(Validators.required)
    }
    this.formBuilderGroup = this.formBuilder.group({
      inputValue: new FormControl({ value: (value || undefined), disabled: this._data.disabled }, validations)
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
    this.dialogRef.close(this.formBuilderGroup.value.inputValue)
  }

  aditionalButtonAction (action: string) {
    switch (action) {
      case 'submitAsNull':
        this.dialogRef.close(null)
        break
    }
  }
}
