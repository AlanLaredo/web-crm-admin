/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

// Third Party
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'

import Swal from 'sweetalert2'

@Component({
  selector: 'client-form-component',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  _loading: boolean = false
  public formBuilderGroup: any = null
  _data: any = {}
  _configuration: any = {
    withDescription: true
  }

  _companies: any[] = []

  @Input('data')
  set data (data: any) {
    this._data = data
    this.initForm()
  }

  @Input('loading')
  set loading (loading: boolean) {
    this._loading = loading
  }

  @Input('configuration')
  set configuration (configuration: any) {
    if (configuration && configuration.withDescription !== undefined) {
      this._configuration.withDescription = configuration.withDescription
    }
  }

  @Input('catalogsData')
  set catalogsData (catalogsData: any) {
    this._companies = catalogsData.companies
  }

  @Output()
  outActionForm: EventEmitter<any> = new EventEmitter<any>()

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService
  ) { }

  ngOnInit (): void {
    this.initForm()
  }

  /*
$keycode: String,
$rfc: String,
$businessName: String,
$businessReason: String,
$legalRepresentativeContact: CreatePersonInput,
$fiscalAddress: CreateAddressInput,
$companyId: ID,
  */
  initForm () {
    this.formBuilderGroup = this.formBuilder.group({
      keycode: new FormControl((this._data.name || null), []),
      rfc: new FormControl((this._data.description || null), []),
      businessName: new FormControl((this._data.description || null), [Validators.required]),
      businessReason: new FormControl((this._data.description || null), []),
      fiscalAddress: new FormControl((this._data.fiscalAddress || null), []),
      companyId: new FormControl((this._data.companyId || null), [])
    })
  }

  submitForm () {
    this.formBuilderGroup.markAllAsTouched()
    if (!this.formBuilderGroup.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const outData = { ...this.formBuilderGroup.value }

    outData.name = outData.name?.trim()
    if (this._data.id) {
      outData.id = this._data.id
    }

    if (!this._configuration.withDescription) {
      delete outData.description
    }
    this.outActionForm.emit(outData)
  }

  cancelForm () {
    this.initForm()
  }
}
