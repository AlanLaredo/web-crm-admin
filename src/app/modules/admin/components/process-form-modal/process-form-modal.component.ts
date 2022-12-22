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
  processFunctions: any[] = []
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
    const companyId = this.user.companyId ? this.user.companyId : (this._process?.companyId || undefined)
    this.formBuilderGroup = this.formBuilder.group({
      name: new FormControl((this._process?.name || undefined), [
        Validators.required
      ]),
      order: new FormControl((this._process?.order || undefined), [
        Validators.required
      ]),
      functionsIds: new FormControl((this._process?.functionsIds || undefined), []),
      companyId: new FormControl({ value: companyId, disabled: !(this.user.userRole.name === 'CrmAdmin') }, [Validators.required])
    })
    if (companyId) {
      this.filterFunctions(companyId)
    }
  }

  filterFunctions (companyId: string) {
    const { processList } = this._companies.find(company => company.id === companyId)
    let existsRegisterKey: boolean = false
    this.processFunctions = []
    processList.forEach((process: any) => {
      if (process.functions) {
        process.functions.forEach((_function: any) => {
          if (_function.key === 'register-client-from-customer-to-client' && (!this._process || (this._process && process.id !== this._process.id))) {
            existsRegisterKey = true
          }
        })
      }
    })

    this.processFunctions = this._processFunctions.map(
      (_function: any) => {
        if (existsRegisterKey && _function.key === 'register-client-from-customer-to-client') {
          _function.disabled = true
        } else {
          _function.disabled = false
        }
        return _function
      }
    )
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
    if (this.user.userRole.name !== 'CrmAdmin') {
      outData.companyId = this.user.companyId
    }

    outData.id = this._process?.id

    this.dialogRef.close(outData)
  }

  public clearStartDate () {
    this.formBuilderGroup.controls.text.setValue(null)
  }
}
