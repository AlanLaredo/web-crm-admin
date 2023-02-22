/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

// Third Party
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { LoginService } from 'src/app/modules/auth/services'
import Swal from 'sweetalert2'

@Component({
  selector: 'user-form-component',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  _loading: boolean = false
  public userForm: any = null
  _user: any = {}
  _roleAccessList: any[] = []
  roleAccessListForCompany: any[] = []
  _companies: any[] = []
  roleAccessName: any
  companyId: any

  @Input('user')
  set user (user: any) {
    this._user = user
    this.initForm()
  }

  @Input('companies')
  set companies (companies: any[]) {
    this._companies = companies
  }

  @Input('loading')
  set loading (loading: boolean) {
    this._loading = loading
  }

  @Input('roleAccessList')
  set roleAccessList (roleAccessList: any[]) {
    this._roleAccessList = roleAccessList
    this.initForm()
  }

  @Output()
  outActionForm: EventEmitter<any> = new EventEmitter<any>()

  @Output()
  outActionRoleAccessChange: EventEmitter<any> = new EventEmitter<any>()

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private loginService: LoginService
  ) {
    const user: any = this.loginService.getUser()
    this.roleAccessName = user.userRole?.name || ''
    this.companyId = user.companyId
  }

  async ngOnInit () {
    this.initForm()
  }

  initForm () {
    this.userForm = this.formBuilder.group({
      firstName: new FormControl((this._user.firstName || ''), [
        Validators.required,
        Validators.minLength(1)
      ]),
      lastName: new FormControl((this._user.lastName || ''), []),
      username: new FormControl((this._user.username || ''), [
        Validators.required,
        Validators.minLength(4),
        this.noWhitespaceValidator,
        this.trimSpaceValidator
      ]),
      email: new FormControl((this._user.email || ''), [
        Validators.required,
        Validators.email
      ]),
      roleAccessId: new FormControl(({ value: this._user.roleAccessId || null, disabled: false }), [Validators.required]),
      companyId: new FormControl((this._user.companyId || null), []),
      password: new FormControl('', [
        Validators.minLength(8)
      ])
    })

    this.updateUserRoles(this.companyId)
  }

  updateUserRoles ($event: any) {
    const companyId = $event && $event.value ? $event.value : false || $event || null
    if (companyId !== null) {
      this.roleAccessListForCompany = this._roleAccessList.filter(role => role.companyId === companyId)
    } else {
      this.roleAccessListForCompany = [...this._roleAccessList]
    }
  }

  submitForm () {
    this.userForm.markAllAsTouched()
    if (!this.userForm.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const user = { ...this.userForm.value }
    user.lastName = user.lastName.trim()
    user.firstName = user.firstName.trim()
    user.password = user.password && user.password.trim() !== '' ? user.password.trim() : undefined
    if (this._user.id) {
      user.id = this._user.id
    }
    if (!user.companyId) {
      user.companyId = this.companyId
    }
    this.outActionForm.emit(user)
  }

  cancelForm () {
    this.initForm()
  }

  public noWhitespaceValidator (control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0
    const isValid = !isWhitespace
    return isValid ? null : { whitespace: true }
  }

  public trimSpaceValidator (control: FormControl) {
    const isWhitespace = (control.value || '').trim() === ''
    const isValid = !isWhitespace
    return isValid ? null : { nodata: true }
  }
}
