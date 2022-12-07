/* eslint-disable no-useless-constructor */
// Third Party
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { IRoleAccess, IUser } from 'src/app/shared/interfaces'
import Swal from 'sweetalert2'

@Component({
  selector: 'user-form-component',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  _loading: boolean = false
  public userForm: any = null
  _user: Partial<IUser> = {}
  _roleAccessList: IRoleAccess[] = []

  @Input('user')
  set user (user: any) {
    this._user = user
    this.initForm()
  }

  get user () {
    return this._user
  }

  @Input('loading')
  set loading (loading: boolean) {
    this._loading = loading
  }

  get loading () {
    return this.loading
  }

  @Input('roleAccessList')
  set roleAccessList (roleAccessList: IRoleAccess[]) {
    this._roleAccessList = roleAccessList
    console.log(roleAccessList)
  }

  get roleAccessList () {
    return this._roleAccessList
  }

  @Output()
  outActionForm: EventEmitter<Partial<IUser>> = new EventEmitter<Partial<IUser>>()

  @Output()
  outActionRoleAccessChange: EventEmitter<Partial<IRoleAccess>> = new EventEmitter<Partial<IRoleAccess>>()

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService
  ) { }

  ngOnInit (): void {
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
      roleAccessId: new FormControl((this._user.roleAccessId || null), [])
    })
    if (!this._user.id) {
      this.userForm.addControl('password', new FormControl((this._user.password || ''), [
        Validators.required,
        Validators.minLength(8)
      ]))
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
    if (this._user.id) {
      user.id = this._user.id
    }
    console.log(user)
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
