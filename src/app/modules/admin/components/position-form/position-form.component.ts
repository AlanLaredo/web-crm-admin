/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

// Third Party
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { LoginService } from 'src/app/modules/auth/services'

import Swal from 'sweetalert2'

@Component({
  selector: 'position-form-component',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss']
})
export class PositionFormComponent implements OnInit {
  _loading: boolean = false
  public formBuilderGroup: any = null
  _data: any = {}
  _clients: any[] = []
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

  @Input('clients')
  set clients (clients: any) {
    this._clients = clients
  }

  @Output()
  outActionForm: EventEmitter<Partial<any>> = new EventEmitter<any>()

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    public loginService: LoginService
  ) {
    this.user = this.loginService.getUser()
  }

  ngOnInit (): void {
    this.initForm()
  }

  initForm () {
    this.formBuilderGroup = this.formBuilder.group({
      name: new FormControl((this._data.name || undefined), [Validators.required]),
      clientId: new FormControl((this._data.clientId || undefined), [Validators.required]),
      salary: new FormControl((this._data.salary || undefined), [])
    })
  }

  submitForm () {
    this.formBuilderGroup.markAllAsTouched()
    if (!this.formBuilderGroup.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const position = { ...this.formBuilderGroup.value } as any

    const outData: any = {}

    outData.name = position.name ? position.name.trim() : undefined
    outData.clientId = position.clientId ? position.clientId : undefined
    outData.salary = position.salary ? position.salary : undefined

    if (this._data.id) {
      outData.id = this._data.id
    }

    this.outActionForm.emit(outData)
  }

  cancelForm () {
    this.initForm()
  }
}
