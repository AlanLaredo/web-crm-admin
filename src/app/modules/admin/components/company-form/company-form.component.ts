/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

// Third Party
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'

import Swal from 'sweetalert2'

@Component({
  selector: 'company-form-component',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  _loading: boolean = false
  public formBuilderGroup: any = null
  _data: any = {}
  _configuration: any = {
    withDescription: true
  }

  _companyGroups: any[] = []
  _companies: any[] = []

  @Input('data')
  set data (data: Partial<any>) {
    this._data = data
    this.initForm()
  }

  @Input('loading')
  set loading (loading: boolean) {
    this._loading = loading
  }

  @Input('catalogsData')
  set catalogsData (catalogsData: any) {
    if (catalogsData) {
      if (catalogsData.companyGroups) {
        this._companyGroups = catalogsData.companyGroups
      }
      if (catalogsData.companies) {
        this._companies = catalogsData.companies
      }
    }
  }

  @Output()
  outActionForm: EventEmitter<Partial<any>> = new EventEmitter<any>()

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
      companyGroupId: new FormControl((this._data.companyGroupId || null), [
      ]),
      companyId: new FormControl((this._data.companyId || null), [
      ])
    })
  }

  submitForm () {
    this.formBuilderGroup.markAllAsTouched()
    if (!this.formBuilderGroup.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const outData = { ...this.formBuilderGroup.value } as any

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
