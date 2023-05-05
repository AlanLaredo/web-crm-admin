/* eslint-disable no-useless-constructor */
/* eslint-disable accessor-pairs */
import { Component, Inject } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { LoginService } from 'src/app/modules/auth/services'
import Swal from 'sweetalert2'

@Component({
  selector: 'operation-form-modal-component',
  templateUrl: './operation-form-modal.component.html',
  styleUrls: ['./operation-form-modal.component.scss']
})
export class OperationFormModalComponent {
  _loading: boolean = false
  _data: any = null
  _operations: any = {}
  description: string = ''

  title: string = 'operationBinnacle.setOperation'
  public formBuilderGroup: any = null

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<OperationFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // title, name, value
  ) {
    if (data) {
      this._data = data
      this._operations = data.operations
    }

    this.initForm()
  }

  initForm () {
    this.formBuilderGroup = this.formBuilder.group({
      abbreviation: new FormControl(this._data.abbreviation, [Validators.required]),
      comment: new FormControl(this._data.comment, []),
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
    const outData = this.formBuilderGroup.value
    this.dialogRef.close(outData)
  }

  updateDescription ($event: any) {
    if ($event && $event.value) {
      this.description = this._operations.find((element: any) => element.abbreviation === $event.value)?.text
    }
  }
}
