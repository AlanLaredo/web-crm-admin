/* eslint-disable no-useless-constructor */
/* eslint-disable accessor-pairs */
import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { COMMA, ENTER } from '@angular/cdk/keycodes'

import Swal from 'sweetalert2'
import { MatChipInputEvent } from '@angular/material/chips'
import { Validators } from '@angular/forms'
import { NotifyService } from '../../services'

@Component({
  selector: 'input-chips-modal-component',
  templateUrl: './input-chips-modal.component.html',
  styleUrls: ['./input-chips-modal.component.scss']
})
export class InputChipModalComponent {
  _loading: boolean = false
  _data: any = {
    title: '',
    info: '',
    inputName: '',
    instructions: '',
    required: true,
    type: '',
    value: null
  }

  availableColors: any[] = [
    { name: 'none', color: undefined },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' }
  ];

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const

  constructor (
    public translate: TranslateService,
    public notifyService: NotifyService,
    public dialogRef: MatDialogRef<InputChipModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this._data.title = data.title
      this._data.inputName = data.inputName
      this._data.instructions = data.instructions
      this._data.info = data.info
      this._data.required = data.required
      this._data.value = data.value
      this._data.aditionalButtons = data.aditionalButtons
    }
    this.initForm()
  }

  initForm () {
  }

  onNoClick (): void {
    this.dialogRef.close()
  }

  submit () {
    if (this._data.required && (!this._data.value || this._data.value.length === 0)) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    this.dialogRef.close(this._data.value)
  }

  aditionalButtonAction (action: string) {
    switch (action) {
      case 'submitAsNull':
        this.dialogRef.close(null)
        break
    }
  }

  add (event: MatChipInputEvent): void {
    const value: string = (event.value || '').trim()
    if (this._data.value.includes(value)) {
      this.notifyService.notify(this.translate.instant('process.emailDuplied'), 'error')
      return
    }
    if (value && value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      this._data.value.push(value)
      event.chipInput!.clear()
    }
  }

  remove (element: string): void {
    const index = this._data.value.indexOf(element)
    if (index >= 0) {
      this._data.value.splice(index, 1)
    }
  }

  edit (element: string, event: any) {
    const value = event.value.trim()

    if (!value) {
      this.remove(element)
      return
    }

    const index = this._data.value.indexOf(element)
    if (index > 0) {
      this._data.value[index].name = value
    }
  }
}
