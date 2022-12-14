/* eslint-disable no-useless-constructor */
/* eslint-disable accessor-pairs */
import { Component, Inject } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { LoginService } from 'src/app/modules/auth/services'
import Swal from 'sweetalert2'

@Component({
  selector: 'process-form-modal-component',
  templateUrl: './process-form-modal.component.html',
  styleUrls: ['./process-form-modal.component.scss']
})
export class ProcessFormModalComponent {
  _loading: boolean = false
  _data: any = null
  _process: any = {}
  _processFunctions: any[] = []
  _companies: any[] = []
  user: any

  title: string =''
  public formBuilderGroup: any = null

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    public loginService: LoginService,
    public dialogRef: MatDialogRef<ProcessFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // title, name, value
  ) {
    this.user = this.loginService.getUser() //
    console.log(this.user.roleAccessId)
    console.log(this.user.userRole.name)
    if (data) {
      this._data = data
      this._process = data.process
      this._processFunctions = data.processFunctions
      this._companies = data.companies
    }

    if (this._process && this._process.id) {
      this.title = 'general.titles.edition'
    } else {
      this.title = 'general.titles.creation'
    }

    this.initForm()
  }

  initForm () {
    this.formBuilderGroup = this.formBuilder.group({
      name: new FormControl((this._process?.name || undefined), [
        Validators.required
      ]),
      order: new FormControl((this._process?.order || undefined), [
        Validators.required
      ]),
      functionsIds: new FormControl((this._process?.functionsIds || undefined), []),
      companyId: new FormControl({ value: !(this.user.userRole.name === 'CrmAdmin') ? this.user.companyId : (this._data.companyId || undefined), disabled: !(this.user.userRole.name === 'CrmAdmin') }, [Validators.required]),
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
    this.dialogRef.close(this.formBuilderGroup.value)
  }

  public clearStartDate () {
    this.formBuilderGroup.controls.text.setValue(null)
  }
}
