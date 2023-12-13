/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

// Third Party
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatChipInputEvent } from '@angular/material/chips'
import { TranslateService } from '@ngx-translate/core'
import { COMMA, ENTER } from '@angular/cdk/keycodes'

import { LoginService } from 'src/app/modules/auth/services'
import { NotifyService } from 'src/app/shared/services'
import Swal from 'sweetalert2'
import { AwsFileService } from '../../services'

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
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const

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
    public loginService: LoginService,
    public awsFileService: AwsFileService,
    public notifyService: NotifyService

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
      salary: new FormControl((this._data.salary || undefined), []),
      salaryExtra: new FormControl((this._data.salaryExtra || undefined), []),
      hoursPerShift: new FormControl((this._data.hoursPerShift || undefined), []),
      bonus: new FormControl((this._data.bonus || undefined), [])
    })
  }

  getFileName (fileAwsKey: string): string {
    return fileAwsKey.replace(fileAwsKey.split('_')[0] + '_', '')
  }

  submitForm () {
    this.formBuilderGroup.markAllAsTouched()
    if (!this.formBuilderGroup.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const position = { ...this.formBuilderGroup.value } as any

    const outData: any = {}
    outData.requiredDocumentsPaths = this._data.requiredDocumentsPaths
    outData.name = position.name ? position.name.trim() : undefined
    outData.clientId = position.clientId ? position.clientId : undefined
    outData.salary = position.salary ? position.salary : undefined
    outData.hoursPerShift = position.hoursPerShift ? position.hoursPerShift : undefined
    outData.bonus = position.bonus ? position.bonus : undefined
    outData.salaryExtra = position.salaryExtra ? position.salaryExtra : undefined

    
    
    if (this._data.id) {
      outData.id = this._data.id
    }

    this.outActionForm.emit(outData)
  }

  cancelForm () {
    this.initForm()
  }

  add (event: MatChipInputEvent): void {
    const value: string = (event.value || '').trim()
    if (!this._data.requiredDocumentsPaths) {
      this._data.requiredDocumentsPaths = []
    }

    if (this._data.requiredDocumentsPaths.includes(value)) {
      this.notifyService.notify(this.translate.instant('messages.duplicated'), 'error')
      return
    }
    if (value) {
      this._data.requiredDocumentsPaths.push(value)
      event.chipInput!.clear()
    }
  }

  remove (element: string): void {
    const index = this._data.requiredDocumentsPaths.indexOf(element)
    if (index >= 0) {
      this._data.requiredDocumentsPaths.splice(index, 1)
    }
  }
}
