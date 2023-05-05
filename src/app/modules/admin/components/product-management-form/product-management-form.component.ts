/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

// Third Party
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'

import Swal from 'sweetalert2'
import { ICatalog } from '../../models/data'

@Component({
  selector: 'product-management-form-component',
  templateUrl: './product-management-form.component.html',
  styleUrls: ['./product-management-form.component.scss']
})
export class ProductManagementFormComponent implements OnInit {
  _loading: boolean = false
  public formBuilderGroup: any = null
  _data: any = {}

  @Input('data')
  set data (data: any) {
    this._data = data
    this.initForm()
  }

  @Input('loading')
  set loading (loading: boolean) {
    this._loading = loading
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
      keycode: new FormControl((this._data.keycode || ''), [
        Validators.required
      ]),
      name: new FormControl((this._data.name || ''), [
        Validators.required
      ]),
      description: new FormControl((this._data.description || ''), [
        Validators.required
      ]),
      reorderPoint: new FormControl((this._data.reorderPoint || ''), [
        Validators.required
      ]),
      unitCost: new FormControl((this._data.unitCost || ''), [
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
    const outData = { ...this.formBuilderGroup.value }

    outData.code = outData.code?.trim()
    outData.name = outData.name?.trim()
    outData.description = outData.description?.trim()
    outData.reorderPoint = Number(outData.reorderPoint || 0)
    outData.unitCost = Number(outData.unitCost || 0)

    if (this._data.id) {
      outData.id = this._data.id
    }

    this.outActionForm.emit(outData)
  }

  cancelForm () {
    this.initForm()
  }
}
