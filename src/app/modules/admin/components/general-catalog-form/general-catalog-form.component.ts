/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

// Third Party
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'

import Swal from 'sweetalert2'
import { ICatalog } from '../../models/data'

@Component({
  selector: 'general-catalog-form-component',
  templateUrl: './general-catalog-form.component.html',
  styleUrls: ['./general-catalog-form.component.scss']
})
export class GeneralCatalogFormComponent implements OnInit {
  _loading: boolean = false
  public formBuilderGroup: any = null
  _data: Partial<ICatalog> = {}
  _configuration: any = {
    withDescription: true
  }

  @Input('data')
  set data (data: Partial<ICatalog>) {
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

  @Output()
  outActionForm: EventEmitter<Partial<ICatalog>> = new EventEmitter<Partial<ICatalog>>()

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
      ])
    })
  }

  submitForm () {
    this.formBuilderGroup.markAllAsTouched()
    if (!this.formBuilderGroup.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const outData = { ...this.formBuilderGroup.value } as ICatalog

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
