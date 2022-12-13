/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

// Third Party
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { LoginService } from 'src/app/modules/auth/services'

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

  userRoleName: any
  companyId: any

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
    public translate: TranslateService,
    private loginService: LoginService
  ) { }

  ngOnInit (): void {
    const user: any = this.loginService.getUser()
    this.userRoleName = user.userRole.name
    this.companyId = user.companyId
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
    let companyId = this._data.companyId || undefined
    if (!companyId && this.companyId) {
      companyId = this.companyId
    }

    this.formBuilderGroup = this.formBuilder.group({
      keycode: new FormControl((this._data.keycode || undefined), []),
      rfc: new FormControl((this._data.rfc || undefined), []),
      businessName: new FormControl((this._data.businessName || undefined), [Validators.required]),
      businessReason: new FormControl((this._data.businessReason || undefined), []),
      fiscalAddress: new FormControl((this._data.fiscalAddress || undefined), []),
      companyId: new FormControl(companyId, [Validators.required]),

      personName: new FormControl((this._data.legalRepresentativeContact?.name || undefined), [Validators.required]),
      personLastName: new FormControl((this._data.legalRepresentativeContact?.lastName || undefined), []),
      personPhoneContacts: new FormControl((this._data.legalRepresentativeContact?.phoneContacts[0] || undefined), []),
      personEmails: new FormControl((this._data.legalRepresentativeContact?.emails[0] || undefined), []),
      personComments: new FormControl((this._data.legalRepresentativeContact?.comments || undefined), []),

      addressName: new FormControl((this._data.fiscalAddress?.name || undefined), []),
      addressStreet: new FormControl((this._data.fiscalAddress?.street || undefined), []),
      addressExteriorNumber: new FormControl((this._data.fiscalAddress?.exteriorNumber || undefined), []),
      addressInteriorNumber: new FormControl((this._data.fiscalAddress?.interiorNumber || undefined), []),
      addressNeightborhood: new FormControl((this._data.fiscalAddress?.neightborhood || undefined), []),
      addressCity: new FormControl((this._data.fiscalAddress?.city || undefined), []),
      addressState: new FormControl((this._data.fiscalAddress?.state || undefined), []),
      addressCountry: new FormControl((this._data.fiscalAddress?.country || undefined), []),
      addressPostalCode: new FormControl((this._data.fiscalAddress?.postalCode || undefined), [])
    })
  }

  submitForm () {
    this.formBuilderGroup.markAllAsTouched()
    if (!this.formBuilderGroup.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const client = { ...this.formBuilderGroup.value }
    const outData: any = {}
    outData.keycode = client.keycode?.trim()
    outData.rfc = client.rfc?.trim()
    outData.businessName = client.businessName?.trim()
    outData.businessReason = client.businessReason?.trim()
    outData.companyId = client.companyId

    outData.legalRepresentativeContact = {}
    outData.legalRepresentativeContact.name = client.personName ? client.personName.trim() : undefined
    outData.legalRepresentativeContact.lastName = client.personLastName ? client.personLastName.trim() : undefined
    outData.legalRepresentativeContact.phoneContacts = client.personPhoneContacts ? [client.personPhoneContacts] : undefined
    outData.legalRepresentativeContact.emails = client.personEmails ? [client.personEmails] : undefined
    outData.legalRepresentativeContact.comments = client.personComments || undefined

    outData.fiscalAddress = {}
    outData.fiscalAddress.name = client.addressName || undefined
    outData.fiscalAddress.street = client.addressStreet || undefined
    outData.fiscalAddress.exteriorNumber = client.addressExteriorNumber || undefined
    outData.fiscalAddress.interiorNumber = client.addressInteriorNumber || undefined
    outData.fiscalAddress.neightborhood = client.addressNeightborhood || undefined
    outData.fiscalAddress.city = client.addressCity || undefined
    outData.fiscalAddress.state = client.addressState || undefined
    outData.fiscalAddress.country = client.addressCountry || undefined
    outData.fiscalAddress.postalCode = client.addressPostalCode || undefined

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
