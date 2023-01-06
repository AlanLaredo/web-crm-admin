/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

// Third Party
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { LoginService } from 'src/app/modules/auth/services'

import Swal from 'sweetalert2'

@Component({
  selector: 'recruit-form-component',
  templateUrl: './recruit-form.component.html',
  styleUrls: ['./recruit-form.component.scss']
})
export class RecruitFormComponent implements OnInit {
  _loading: boolean = false
  public formBuilderGroup: any = null
  _data: any = {}
  _documents: string[] = []

  @Input('data')
  set data (data: Partial<any>) {
    this._data = data
    this.initForm()
  }

  @Input('documents')
  set documents (documents: string[]) {
    this._documents = documents
  }

  @Input('loading')
  set loading (loading: boolean) {
    this._loading = loading
  }

  @Output()
  outActionForm: EventEmitter<any> = new EventEmitter<any>()

  @Output()
  outActionFormReasignment: EventEmitter<any> = new EventEmitter<any>()

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private loginService: LoginService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit (): void {
    this.initForm()
  }

  initForm () {
    this.formBuilderGroup = this.formBuilder.group({
      interviewerName: new FormControl((this._data.interviewerName || undefined), [Validators.required]),

      contactName: new FormControl((this._data.data?.name || undefined), [Validators.required]),
      contactLastName: new FormControl((this._data.data?.lastName || undefined), []),
      contactPhoneContacts: new FormControl((this._data.data?.phoneContacts && this._data.person?.phoneContacts[0] ? this._data.person?.phoneContacts[0] : undefined), []),
      contactEmails: new FormControl((this._data.data?.emails && this._data.person?.emails[0] ? this._data.person?.emails[0] : undefined), []),
      comments: new FormControl((this._data.data?.comments || undefined), []),

      name: new FormControl((this._data.data?.address?.name || undefined), []),
      street: new FormControl((this._data.data?.address?.street || undefined), []),
      exteriorNumber: new FormControl((this._data.data?.address?.exteriorNumber || undefined), []),
      interiorNumber: new FormControl((this._data.data?.address?.interiorNumber || undefined), []),
      neightborhood: new FormControl((this._data.data?.address?.neightborhood || undefined), []),
      city: new FormControl((this._data.data?.address?.city || undefined), []),
      state: new FormControl((this._data.data?.address?.state || undefined), []),
      country: new FormControl((this._data.data?.address?.country || undefined), []),
      postalCode: new FormControl((this._data.data?.address?.postalCode || undefined), []),
      requiredDocumentsPaths: new FormControl((this._data.requiredDocumentsPaths || null), [])
    })
  }

  submitForm () {
    this.formBuilderGroup.markAllAsTouched()
    if (!this.formBuilderGroup.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const employee = { ...this.formBuilderGroup.value } as any

    const outData: any = {}
    outData.interviewerName = employee.interviewerName?.trim()

    outData.data = {}
    outData.data.name = employee.contactName?.trim()
    outData.data.lastName = employee.contactLastName?.trim()
    outData.data.phoneContacts = employee.contactPhoneContacts ? [employee.contactPhoneContacts] : []
    outData.data.emails = employee.contactEmails ? [employee.contactEmails] : []
    outData.data.comments = employee.comments?.trim()

    if (employee.name || employee.street || employee.exteriorNumber || employee.interiorNumber || employee.neightborhood || employee.city || employee.state || employee.country || employee.postalCode) {
      outData.data.address = {}
      outData.data.address.name = employee.name ? employee.name : undefined
      outData.data.address.street = employee.street ? employee.street : undefined
      outData.data.address.exteriorNumber = employee.exteriorNumber ? employee.exteriorNumber : undefined
      outData.data.address.interiorNumber = employee.interiorNumber ? employee.interiorNumber : undefined
      outData.data.address.neightborhood = employee.neightborhood ? employee.neightborhood : undefined
      outData.data.address.city = employee.city ? employee.city : undefined
      outData.data.address.state = employee.state ? employee.state : undefined
      outData.data.address.country = employee.country ? employee.country : undefined
      outData.data.address.postalCode = employee.postalCode ? employee.postalCode : undefined
    }

    outData.requiredDocumentsPaths = employee.requiredDocumentsPaths
    if (this._data.id) {
      outData.id = this._data.id
    } else {
      outData.statusApplicant = 0
    }

    this.outActionForm.emit(outData)
  }

  cancelForm () {
    this.initForm()
  }
}
