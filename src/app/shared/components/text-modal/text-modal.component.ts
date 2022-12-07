/* eslint-disable no-useless-constructor */
/* eslint-disable accessor-pairs */
import { Component, Inject } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

@Component({
  selector: 'text-modal-component',
  templateUrl: './text-modal.component.html',
  styleUrls: ['./text-modal.component.scss']
})
export class TextModalComponent {
  _loading: boolean = false
  _data: any = null
  public formBuilderGroup: any = null

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<TextModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // title, name, value
  ) {
    if (data) {
      this._data = data
    }
    this.initForm()
  }

  initForm () {
    this.formBuilderGroup = this.formBuilder.group({
      text: new FormControl((this._data.value), [
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
    this.dialogRef.close(this.formBuilderGroup.value.text)
  }

  public clearStartDate () {
    this.formBuilderGroup.controls.text.setValue(null)
  }
}
