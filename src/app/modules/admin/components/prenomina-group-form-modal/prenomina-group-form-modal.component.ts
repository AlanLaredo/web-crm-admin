/* eslint-disable no-useless-constructor */
/* eslint-disable accessor-pairs */
import { Component, Inject } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'
import * as fileSaver from 'file-saver'

import { LoginService } from 'src/app/modules/auth/services'
import { AwsFileService } from '../../services'
import { NotifyService } from 'src/app/shared/services'
import { PERIODS_CATALOG_DATA } from '../../data'

@Component({
  selector: 'prenomina-group-form-modal-component',
  templateUrl: './prenomina-group-form-modal.component.html',
  styleUrls: ['./prenomina-group-form-modal.component.scss']
})
export class PrenominaGroupFormModalComponent {
  _loading: boolean = false
  _data: any = {}
  _clients: any = {}
  _disabled: boolean = false
  periods: any[] = [
    { value: PERIODS_CATALOG_DATA.weekly, label: 'Semanal' },
    { value: PERIODS_CATALOG_DATA.biweekly, label: 'Quincenal' },
    { value: PERIODS_CATALOG_DATA.monthly, label: 'Mensual' }
  ]

  title: string =''
  public formBuilderGroup: any = null

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    public notifyService: NotifyService,
    public dialogRef: MatDialogRef<PrenominaGroupFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // title, name, value
  ) {
    if (data) {
      this._clients = data.clients
      this._data = data.prenominaConfiguration
    }

    if (this._data && this._data.id) {
      this.title = 'general.titles.edition'
    } else {
      this.title = 'general.titles.creation'
    }
    this.initForm()
  }

  initForm () {
    this.formBuilderGroup = this.formBuilder.group({
      name: new FormControl({ value: (this._data?.name || undefined), disabled: this._disabled }, [Validators.required]),
      clientsIds: new FormControl({ value: (this._data?.clientsIds || undefined), disabled: this._disabled }, [Validators.required]),
      billingPeriod: new FormControl({ value: (this._data?.billingPeriod || undefined), disabled: this._disabled }, [Validators.required])
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
    const outData: any = this.formBuilderGroup.getRawValue()
    outData.id = this._data?.id
    outData.name = outData.name ? outData.name?.trim() : undefined
    this.dialogRef.close(outData)
  }
}
