/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

// Third Party
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { LoginService } from 'src/app/modules/auth/services'

import Swal from 'sweetalert2'

@Component({
  selector: 'employee-form-component',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  _loading: boolean = false
  public formBuilderGroup: any = null
  _data: any = {}
  _companies: any[] = []
  _positions: any[] = []
  _clients: any[] = []
  clientsForCompany: any[] = []
  positionsForClient: any[] = []
  user: any

  @Input('data')
  set data (data: Partial<any>) {
    this._data = data
    this.initForm()
  }

  @Input('loading')
  set loading (loading: boolean) {
    this._loading = loading
  }

  @Input('companies')
  set companies (companies: any) {
    this._companies = companies
    this.initForm()
  }

  @Input('positions')
  set positions (positions: any) {
    this._positions = positions
    this.initForm()
  }

  @Input('clients')
  set clients (clients: any) {
    this._clients = clients
    this.initForm()
  }

  @Output()
  outActionForm: EventEmitter<Partial<any>> = new EventEmitter<any>()

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private loginService: LoginService
  ) {
    this.user = this.loginService.getUser()
  }

  ngOnInit (): void {
    this.initForm()
  }

  initForm () {
    this.formBuilderGroup = this.formBuilder.group({
      keycode: new FormControl((this._data.keycode || undefined), []),
      positionId: new FormControl((this._data.positionId || undefined), []),
      hiringDate: new FormControl((this._data.hiringDate || undefined), []),
      startOperationDate: new FormControl((this._data.startOperationDate || undefined), []),
      clientId: new FormControl((this._data.clientId || undefined), []),
      companyId: new FormControl({ value: !(this.user.userRole.name === 'CrmAdmin') ? this.user.companyId : (this._data.companyId || undefined), disabled: !(this.user.userRole.name === 'CrmAdmin') }, [Validators.required]),

      contactName: new FormControl((this._data.person?.name || undefined), [Validators.required]),
      contactLastName: new FormControl((this._data.person?.lastName || undefined), []),
      contactPhoneContacts: new FormControl((this._data.person?.phoneContacts && this._data.person?.phoneContacts[0] ? this._data.person?.phoneContacts[0] : undefined), []),
      contactEmails: new FormControl((this._data.person?.emails && this._data.person?.emails[0] ? this._data.person?.emails[0] : undefined), []),

      name: new FormControl((this._data.address?.name || undefined), []),
      street: new FormControl((this._data.address?.street || undefined), []),
      exteriorNumber: new FormControl((this._data.address?.exteriorNumber || undefined), []),
      interiorNumber: new FormControl((this._data.address?.interiorNumber || undefined), []),
      neightborhood: new FormControl((this._data.address?.neightborhood || undefined), []),
      city: new FormControl((this._data.address?.city || undefined), []),
      state: new FormControl((this._data.address?.state || undefined), []),
      country: new FormControl((this._data.address?.country || undefined), []),
      postalCode: new FormControl((this._data.address?.postalCode || undefined), [])
    })

    const companyId = !(this.user.userRole.name === 'CrmAdmin') ? this.user.companyId : this._data.companyId || undefined
    if (companyId) {
      this.updateClientsForCompany({ value: companyId })
    }

    if (this._data.clientId) {
      this.updatePositionsForClient({ value: this._data.clientId })
    }
  }

  submitForm () {
    this.formBuilderGroup.markAllAsTouched()
    if (!this.formBuilderGroup.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const employee = { ...this.formBuilderGroup.value } as any

    const outData: any = {}

    outData.keycode = employee.keycode ? employee.keycode.trim() : undefined
    outData.positionId = employee.positionId ? employee.positionId : undefined
    outData.hiringDate = employee.hiringDate ? employee.hiringDate : undefined
    outData.startOperationDate = employee.startOperationDate ? employee.startOperationDate : undefined
    outData.clientId = employee.clientId ? employee.clientId : undefined
    outData.companyId = employee.companyId ? employee.companyId : undefined

    outData.person = {}
    outData.person.name = employee.contactName?.trim()
    outData.person.lastName = employee.contactLastName?.trim()
    outData.person.phoneContacts = employee.contactPhoneContacts ? [employee.contactPhoneContacts] : []
    outData.person.emails = employee.contactEmails ? [employee.contactEmails] : []

    if (employee.name || employee.street || employee.exteriorNumber || employee.interiorNumber || employee.neightborhood || employee.city || employee.state || employee.country || employee.postalCode) {
      outData.address = {}
      outData.address.name = employee.name ? employee.name : undefined
      outData.address.street = employee.street ? employee.street : undefined
      outData.address.exteriorNumber = employee.exteriorNumber ? employee.exteriorNumber : undefined
      outData.address.interiorNumber = employee.interiorNumber ? employee.interiorNumber : undefined
      outData.address.neightborhood = employee.neightborhood ? employee.neightborhood : undefined
      outData.address.city = employee.city ? employee.city : undefined
      outData.address.state = employee.state ? employee.state : undefined
      outData.address.country = employee.country ? employee.country : undefined
      outData.address.postalCode = employee.postalCode ? employee.postalCode : undefined
    }

    if (this._data.id) {
      outData.id = this._data.id
    }

    this.outActionForm.emit(outData)
  }

  updateClientsForCompany ($event: any) {
    const companyId = $event.value
    this.clientsForCompany = this._clients.filter(_client => _client.companyId === companyId)
    this.updatePositionsForClient({ value: null })
  }

  updatePositionsForClient ($event: any) {
    const clientId = $event.value
    this.positionsForClient = this._positions.filter(_position => _position.clientId === clientId)
  }

  cancelForm () {
    this.initForm()
  }
}
