/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

// Third Party
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'

import Swal from 'sweetalert2'

@Component({
  selector: 'person-form-component',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
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

  initForm () {
    this.formBuilderGroup = this.formBuilder.group({
      name: new FormControl((this._data.name || null), [Validators.required]),
      lastName: new FormControl((this._data.description || null), []),
      phoneContacts: new FormControl((this._data.description || null), [Validators.required]),
      emails: new FormControl((this._data.description || null), []),
      comments: new FormControl((this._data.fiscalAddress || null), [])
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
