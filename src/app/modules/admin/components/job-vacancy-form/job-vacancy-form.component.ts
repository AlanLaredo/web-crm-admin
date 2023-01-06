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

@Component({
  selector: 'job-vacancy-form-component',
  templateUrl: './job-vacancy-form.component.html',
  styleUrls: ['./job-vacancy-form.component.scss']
})
export class JobVacancyFormComponent implements OnInit {
  _loading: boolean = false
  public formBuilderGroup: any = null
  _data: any = {}
  _clients: any[] = []
  positionsForClientService: any[] = []
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
    console.log(clients)
    this._clients = clients
    this.initForm()
  }

  @Output()
  outActionForm: EventEmitter<any> = new EventEmitter<any>()

  @Output()
  outActionFormReasignment: EventEmitter<any> = new EventEmitter<any>()

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    public notifyService: NotifyService,
    private loginService: LoginService
  ) {
    this.user = this.loginService.getUser()
  }

  ngOnInit (): void {
    this.initForm()
  }

  initForm () {
    this.formBuilderGroup = this.formBuilder.group({
      clientServiceId: new FormControl((this._data.clientServiceId || undefined), [Validators.required]),
      positionId: new FormControl((this._data.positionId || undefined), [Validators.required]),
      totalVacancies: new FormControl((this._data.totalVacancies || 0), [Validators.min(1), Validators.required])
    })

    if (this._data.clientServiceId) {
      this.updatePositionsForClientService({ value: this._data.clientServiceId })
    }
  }

  submitForm () {
    this.formBuilderGroup.markAllAsTouched()
    if (!this.formBuilderGroup.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const outData: any = { ...this.formBuilderGroup.value } as any
    outData.requiredDocumentsPaths = this._data.requiredDocumentsPaths
    if (this._data.id) {
      outData.id = this._data.id
    } else {
      outData.jobVacanciesStatus = 0
    }

    outData.companyId = this.user.companyId
    if (!outData.companyId) {
      Swal.fire({ icon: 'warning', titleText: 'El Super administrador no puede crear vacantes.' }).then()
      return
    }
    this.outActionForm.emit(outData)
  }

  async updatePositionsForClientService ($event: any) {
    const clientServiceId = $event.value
    const client = this._clients.find(element => element.clientServices.find((clientService: any) => clientService.id === clientServiceId))
    this.positionsForClientService = client.positions || []
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
