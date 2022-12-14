/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

// Third Party
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'

import Swal from 'sweetalert2'

@Component({
  selector: 'client-service-form-component',
  templateUrl: './client-service-form.component.html',
  styleUrls: ['./client-service-form.component.scss']
})
export class ClientServiceFormComponent implements OnInit {
  _loading: boolean = false
  public formBuilderGroup: any = null
  _data: any = {}

  @Input('data')
  set data (data: Partial<any>) {
    this._data = data
    this.initForm()
  }

  @Input('loading')
  set loading (loading: boolean) {
    this._loading = loading
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
      serviceType: new FormControl((this._data.serviceType || undefined), []),
      scheduleHours: new FormControl((this._data.scheduleHours || undefined), []),
      serviceCost: new FormControl((this._data.serviceCost || undefined), []),
      elementCost: new FormControl((this._data.elementCost || undefined), []),
      patrolCost: new FormControl((this._data.patrolCost || undefined), []),
      quadBikeCost: new FormControl((this._data.quadBikeCost || undefined), []),
      bossShiftCost: new FormControl((this._data.bossShiftCost || undefined), []),
      qrCost: new FormControl((this._data.qrCost || undefined), []),
      costHolyDays: new FormControl((this._data.costHolyDays || undefined), []),
      addressExecution: new FormControl((this._data.addressExecution || undefined), []),
      totalElementsDay: new FormControl((this._data.totalElementsDay || undefined), []),
      totalElementsNight: new FormControl((this._data.totalElementsNight || undefined), []),
      totalPatrol: new FormControl((this._data.totalPatrol || undefined), []),
      totalQuadBike: new FormControl((this._data.totalQuadBike || undefined), []),
      startDate: new FormControl((this._data.startDate || undefined), []),
      creditDays: new FormControl((this._data.creditDays || undefined), []),
      paymentDays: new FormControl((this._data.paymentDays || undefined), []),
      folioCounterReceipt: new FormControl((this._data.folioCounterReceipt || undefined), []),
      billing: new FormControl((this._data.billing || undefined), []),
      branchBank: new FormControl((this._data.branchBank || undefined), []),
      lastFourDigits: new FormControl((this._data.lastFourDigits || undefined), []),
      paymentMethod: new FormControl((this._data.paymentMethod || undefined), []),
      usageCfdi: new FormControl((this._data.usageCfdi || undefined), []),
      paymentForm: new FormControl((this._data.paymentForm || undefined), []),
      emergencyContactName: new FormControl((this._data.emergencyContact?.name || undefined), [Validators.required]),
      emergencyContactLastName: new FormControl((this._data.emergencyContact?.lastName || undefined), []),
      emergencyContactPhoneContacts: new FormControl((this._data.emergencyContact?.phoneContacts && this._data.emergencyContact?.phoneContacts[0] ? this._data.emergencyContact?.phoneContacts[0] : undefined), []),
      emergencyContactEmails: new FormControl((this._data.emergencyContact?.emails && this._data.emergencyContact?.emails[0] ? this._data.emergencyContact?.emails[0]: undefined), []),
      paymentContactName: new FormControl((this._data.paymentContact?.name || undefined), [Validators.required]),
      paymentContactLastName: new FormControl((this._data.paymentContact?.lastName || undefined), []),
      paymentContactPhoneContacts: new FormControl((this._data.paymentContact?.phoneContacts && this._data.paymentContact?.phoneContacts[0] ? this._data.paymentContact?.phoneContacts[0] : undefined), []),
      paymentContactEmails: new FormControl((this._data.paymentContact?.emails && this._data.paymentContact?.emails[0] ? this._data.paymentContact?.emails[0] : undefined), [])
    })
  }

  submitForm () {
    this.formBuilderGroup.markAllAsTouched()
    if (!this.formBuilderGroup.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const serviceClient = { ...this.formBuilderGroup.value } as any

    const outData: any = {}
    outData.serviceType = serviceClient.serviceType?.trim()
    outData.scheduleHours = serviceClient.scheduleHours?.trim()
    outData.serviceCost = serviceClient.serviceCost
    outData.elementCost = serviceClient.elementCost
    outData.patrolCost = serviceClient.patrolCost
    outData.quadBikeCost = serviceClient.quadBikeCost
    outData.bossShiftCost = serviceClient.bossShiftCost
    outData.qrCost = serviceClient.qrCost
    outData.costHolyDays = serviceClient.costHolyDays
    outData.addressExecution = serviceClient.addressExecution?.trim()
    outData.totalElementsDay = serviceClient.totalElementsDay
    outData.totalElementsNight = serviceClient.totalElementsNight
    outData.totalPatrol = serviceClient.totalPatrol
    outData.totalQuadBike = serviceClient.totalQuadBike
    outData.startDate = serviceClient.startDate
    outData.creditDays = serviceClient.creditDays
    outData.paymentDays = serviceClient.paymentDays
    outData.folioCounterReceipt = serviceClient.folioCounterReceipt
    outData.billing = serviceClient.billing?.trim()
    outData.branchBank = serviceClient.branchBank?.trim()
    outData.lastFourDigits = serviceClient.lastFourDigits?.trim()
    outData.paymentMethod = serviceClient.paymentMethod?.trim()
    outData.usageCfdi = serviceClient.usageCfdi?.trim()
    outData.paymentForm = serviceClient.paymentForm?.trim()

    outData.emergencyContact = {}
    outData.emergencyContact.name = serviceClient.emergencyContactName
    outData.emergencyContact.lastName = serviceClient.emergencyContactLastName
    outData.emergencyContact.phoneContacts = serviceClient.emergencyContactPhoneContacts ? [serviceClient.emergencyContactPhoneContacts] : []
    outData.emergencyContact.emails = serviceClient.emergencyContactEmails ? [serviceClient.emergencyContactEmails] : []
    outData.paymentContact = {}
    outData.paymentContact.name = serviceClient.paymentContactName
    outData.paymentContact.lastName = serviceClient.paymentContactLastName
    outData.paymentContact.phoneContacts = serviceClient.paymentContactPhoneContacts ? [serviceClient.paymentContactPhoneContacts] : []
    outData.paymentContact.emails = serviceClient.paymentContactEmails ? [serviceClient.paymentContactEmails] : []

    if (this._data.id) {
      outData.id = this._data.id
    }

    this.outActionForm.emit(outData)
  }

  cancelForm () {
    this.initForm()
  }
}
