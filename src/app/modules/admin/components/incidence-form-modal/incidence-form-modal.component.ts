/* eslint-disable no-useless-constructor */
/* eslint-disable accessor-pairs */
import { Component, Inject } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { DateTime } from 'luxon'
import Swal from 'sweetalert2'

@Component({
  selector: 'incidence-form-modal-component',
  templateUrl: './incidence-form-modal.component.html',
  styleUrls: ['./incidence-form-modal.component.scss']
})
export class IncidenceFormModalComponent {
  _loading: boolean = false
  _data: any = null

  title: string = 'operationBinnacle.incidence'
  public formBuilderGroup: any = null

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<IncidenceFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // title, name, value
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
    this.formBuilderGroup = this.formBuilder.group({
      date: new FormControl(date || undefined, [Validators.required]),
      generalComments: new FormControl(this._data.generalComments || undefined, [Validators.required]),
      serviceComments: new FormControl(this._data.serviceComments || undefined, [Validators.required]),
      supervisorComments: new FormControl(this._data.supervisorComments || undefined, [Validators.required]),
      eventComments: new FormControl(this._data.eventComments || undefined, [Validators.required]),
      coordinationComments: new FormControl(this._data.coordinationComments || undefined, [Validators.required]),
      followAndConclusionComments: new FormControl(this._data.followAndConclusionComments || undefined, [Validators.required]),
      moreComments: new FormControl(this._data.moreComments || undefined, [Validators.required])
    })
  }

  onNoClick (): void {
    this.dialogRef.close()
  }

  submit (destination: number) {
    if (!this.formBuilderGroup.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const outData = this.formBuilderGroup.value
    outData.destination = destination
    this.dialogRef.close(outData)
  }

  public clearStartDate () {
    this.formBuilderGroup.controls.date.setValue(null)
  }
}
