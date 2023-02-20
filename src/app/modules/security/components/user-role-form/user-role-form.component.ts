/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

// Third Party
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { LoginService } from 'src/app/modules/auth/services'

import Swal from 'sweetalert2'

@Component({
  selector: 'user-role-form-component',
  templateUrl: './user-role-form.component.html',
  styleUrls: ['./user-role-form.component.scss']
})
export class UserRoleFormComponent implements OnInit {
  _loading: boolean = false
  public formBuilderGroup: any = null
  _companies: any[] = []
  _data: any = {}
  _configuration: any = {
    withDescription: true
  }

  roleAccessName: any
  companyId: any
  user: any

  @Input('data')
  set data (data: Partial<any>) {
    this._data = data
    this.initForm()
  }

  @Input('loading')
  set loading (loading: boolean) {
    this._loading = loading
  }

  @Input('companies')
  set companies (companies: any[]) {
    this._companies = companies
  }

  @Output()
  outActionForm: EventEmitter<Partial<any>> = new EventEmitter<any>()

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private loginService: LoginService
  ) {
    this.user = this.loginService.getUser()
    this.roleAccessName = this.user.userRole?.name || ''
    this.companyId = this.user.companyId
  }

  ngOnInit (): void {
    this.initForm()
  }

  initForm () {
    this.formBuilderGroup = this.formBuilder.group({
      name: new FormControl((this._data.name || ''), [
        Validators.required
      ]),
      description: new FormControl((this._data.description || ''), [
      ]),
      companyId: new FormControl((this.roleAccessName === 'CrmAdmin' ? this._data.companyId : this.companyId || null), [Validators.required])
    })
  }

  submitForm () {
    this.formBuilderGroup.markAllAsTouched()
    if (!this.formBuilderGroup.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const outData = { ...this.formBuilderGroup.getRawValue() } as any

    outData.name = outData.name?.trim()
    if (this._data.id) {
      outData.id = this._data.id
    }

    if (this.user.companyId) {
      outData.companyId = this.user.companyId
    }

    this.outActionForm.emit(outData)
  }

  cancelForm () {
    this.initForm()
  }
}
