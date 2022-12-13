/* eslint-disable no-useless-constructor */
// Third Party
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { IPermission } from 'src/app/shared/interfaces'

@Component({
  selector: 'permission-form-component',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss']
})
export class PermissionFormComponent implements OnInit {
  _loading: boolean = false
  public formBuilderGroup: any = null
  _data: Partial<IPermission> = {}

  @Input('data')
  set data (data: any) {
    this._data = data
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

  @Output()
  outActionForm: EventEmitter<Partial<IPermission>> = new EventEmitter<Partial<IPermission>>()

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
      ]),
      tag: new FormControl((this._data.tag || ''), [
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
    const permission = { ...this.formBuilderGroup.value } as IPermission
    permission.name = permission.name?.trim()
    permission.description = permission.description?.trim()
    permission.tag = permission.tag?.trim()
    if (this._data.id) {
      permission.id = this._data.id
    }
    this.outActionForm.emit(permission)
  }

  cancelForm () {
    this.initForm()
  }
}
