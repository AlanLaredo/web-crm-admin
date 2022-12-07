/* eslint-disable no-useless-constructor */
// Third Party
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'

import Swal from 'sweetalert2'
import { IClient } from '../../models/data'

@Component({
  selector: 'client-form-component',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit, OnDestroy {
  _loading: boolean = false
  public formBuilderGroup: any = null
  _data: Partial<IClient> = {}
  contactNumbers: string[] = ['']
  contactNumbersValue: string[] = ['']
  isValidSubscription: any

  _configuration: any = {
    saveButton: true,
    editable: true
  }

  @Input('data')
  set data (data: Partial<IClient>) {
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

  @Input('configuration')
  set configuration (configuration: any) {
    if (configuration) {
      this._configuration.saveButton = configuration.saveButton !== undefined ? configuration.saveButton : true
      this._configuration.editable = configuration.editable !== undefined ? configuration.editable : true
    }
  }

  get configuration () {
    return this._configuration
  }

  @Output()
  outActionForm: EventEmitter<Partial<IClient>> = new EventEmitter<Partial<IClient>>()

  @Output()
  outIsValid: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService
  ) { }

  ngOnInit (): void {
    this.initForm()
  }

  ngOnDestroy () {
    this.isValidSubscription.unsubscribe()
  }

  initForm () {
    this.formBuilderGroup = this.formBuilder.group({
      name: new FormControl({ value: (this._data.name || ''), disabled: !this._configuration.editable }, [
        Validators.required
      ]),
      email: new FormControl({ value: (this._data.email || ''), disabled: !this._configuration.editable }, [
        Validators.email
      ]),
      managerName: new FormControl({ value: (this._data.managerName || ''), disabled: !this._configuration.editable }, [
        Validators.required
      ]),
      legalRepresentative: new FormControl({ value: (this._data.legalRepresentative || ''), disabled: !this._configuration.editable }, [
        Validators.required
      ]),
      postalCode: new FormControl({ value: (this._data.postalCode || ''), disabled: !this._configuration.editable }, [
      ]),
      suburb: new FormControl({ value: (this._data.suburb || ''), disabled: !this._configuration.editable }, [
        Validators.required
      ]),
      street: new FormControl({ value: (this._data.street || ''), disabled: !this._configuration.editable }, [
        Validators.required
      ]),
      locationReferences: new FormControl({ value: (this._data.locationReferences || ''), disabled: !this._configuration.editable }, [
      ]),
      socialReason: new FormControl({ value: (this._data.socialReason || ''), disabled: !this._configuration.editable }, [
      ]),
      fiscalAddress: new FormControl({ value: (this._data.fiscalAddress || ''), disabled: !this._configuration.editable }, [
      ]),
      usageCfdi: new FormControl({ value: (this._data.usageCfdi || ''), disabled: !this._configuration.editable }, [
      ]),
      rfc: new FormControl({ value: (this._data.rfc || ''), disabled: !this._configuration.editable }, [
      ]),
      fiscalEmail: new FormControl({ value: (this._data.fiscalEmail || ''), disabled: !this._configuration.editable }, [
        Validators.email
      ])
    })

    if (!this._data.contactNumbers || this._data.contactNumbers.length === 0) {
      this._data.contactNumbers = ['']
    }
    this.contactNumbers = [...this._data.contactNumbers]
    this.contactNumbersValue = [...this._data.contactNumbers]

    this.isValidSubscription = this.formBuilderGroup.valueChanges.subscribe(() => {
      this.sendOutData()
    })
  }

  sendOutData () {
    const outData = { ...this.formBuilderGroup.value, contactNumbers: this.contactNumbersValue } as IClient
    if (this._data.id) {
      outData.id = this._data.id
    }
    const existsEmptyNumbers = outData.contactNumbers.find(element => element.trim() === '')
    if (this.formBuilderGroup.valid && this.contactNumbersValue.length >= 1 && existsEmptyNumbers === undefined) {
      this.outIsValid.emit(true)
    } else {
      this.outIsValid.emit(false)
    }
    this.outActionForm.emit(outData)
  }

  addContactNumber () {
    if (!this.contactNumbers || this.contactNumbers.length === 0) {
      this.contactNumbers = ['']
    }
    this.contactNumbers.push('')
    this.contactNumbersValue.push('')
  }

  removeContactNumber (index: number) {
    this.contactNumbers = this.contactNumbers.filter((value, elementIndex) => elementIndex !== index)
    this.contactNumbersValue = this.contactNumbersValue.filter((value, elementIndex) => elementIndex !== index)
    this.sendOutData()
  }

  updateContactNumber ($event: any, index: number) {
    this.contactNumbersValue[index] = $event.target.value
    this.contactNumbersValue = [...this.contactNumbersValue]
    setTimeout(() => this.sendOutData(), 0)
  }

  submitForm () {
    if (this.contactNumbersValue[0].trim() === '') {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('clients.form.validations.phoneNumbers.insufficientData') }).then()
      return
    }

    this.formBuilderGroup.markAllAsTouched()
    if (!this.formBuilderGroup.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const outData = { ...this.formBuilderGroup.value, contactNumbers: this.contactNumbersValue } as IClient

    outData.name = outData.name?.trim()
    if (this._data.id) {
      outData.id = this._data.id
    }
    this.outActionForm.emit(outData)
  }

  cancelForm () {
    this.initForm()
  }
}
