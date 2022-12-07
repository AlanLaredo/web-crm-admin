/* eslint-disable no-useless-constructor */
// Third Party
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { IPermission, IRoleAccess } from 'src/app/shared/interfaces'

@Component({
  selector: 'role-access-form-component',
  templateUrl: './role-access-form.component.html',
  styleUrls: ['./role-access-form.component.scss']
})
export class RoleAccessFormComponent implements OnInit {
  _loading: boolean = false
  public formBuilderGroup: any = null
  _data: Partial<IRoleAccess> = {}
  _permissions: IPermission[] = []
  permissionsIds: any

  @Input('data')
  set data (data: Partial<IRoleAccess>) {
    this._data = data
    this.permissionsIds = this._data.permissionIds
    this.initForm()
  }

  get data () {
    return this._data
  }

  @Input('loading')
  set loading (loading: boolean) {
    this._loading = loading
  }

  get loading () {
    return this.loading
  }

  @Input('permissions')
  set permissions (permissions: IPermission[]) {
    this._permissions = permissions
  }

  get permissions () {
    return this._permissions
  }

  @Output()
  outActionForm: EventEmitter<Partial<IRoleAccess>> = new EventEmitter<Partial<IRoleAccess>>()

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService
  ) { }

  ngOnInit (): void {
    this.initForm()
  }

  initForm () {
    this.formBuilderGroup = this.formBuilder.group({
      name: new FormControl((this._data.name || ''), [
        Validators.required
      ]),
      description: new FormControl((this._data.description || ''), [
        Validators.required
      ])
    })
  }

  submitForm () {
    this.formBuilderGroup.markAllAsTouched()
    if (!this.formBuilderGroup.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const outputRow = { ...this.formBuilderGroup.value } as IRoleAccess
    outputRow.name = outputRow.name?.trim()
    outputRow.description = outputRow.description?.trim()
    if (this._data.id) {
      outputRow.id = this._data.id
      outputRow.permissionIds = this._data.permissionIds || []
    }
    this.outActionForm.emit(outputRow)
  }

  cancelForm () {
    this.initForm()
  }

  updatePermissionSettings ($event: any) {
    this._data.permissionIds = $event
  }
}
