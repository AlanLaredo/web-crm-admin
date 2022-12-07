/* eslint-disable no-useless-constructor */
/* eslint-disable accessor-pairs */
import { Component, Inject } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
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
    value: null
  }

  public formBuilderGroup: any = null

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<InputModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this._data.title = data.title
      this._data.inputName = data.inputName
      this._data.instructions = data.instructions
      this._data.info = data.info
      this._data.required = data.required
      this._data.type = data.type
      this._data.value = data.value
    }
    this.initForm()
  }

  initForm () {
    this.formBuilderGroup = this.formBuilder.group({
      inputValue: new FormControl((this._data.value), [
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
    this.dialogRef.close(this.formBuilderGroup.value.inputValue)
  }
}
