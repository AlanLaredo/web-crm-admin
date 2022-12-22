/* eslint-disable no-useless-constructor */
/* eslint-disable accessor-pairs */
import { Component, Inject } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { LoginService } from 'src/app/modules/auth/services'
import Swal from 'sweetalert2'

@Component({
  selector: 'process-customer-form-modal-component',
  templateUrl: './process-customer-form-modal.component.html',
  styleUrls: ['./process-customer-form-modal.component.scss']
})
export class ProcessCustomerFormModalComponent {
  _loading: boolean = false
  _process: any = {}
  _customer: any = {}
  _clients: any = {}
  user: any
  _disabled: boolean = false

  title: string =''
  public formBuilderGroup: any = null

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    public loginService: LoginService,
    public dialogRef: MatDialogRef<ProcessCustomerFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // title, name, value
  ) {
    this.user = this.loginService.getUser() //
    if (data) {
      this._process = data.process
      this._clients = data.clients
      this._customer = data.customer
      if (data.disabled !== undefined) {
        this._disabled = data.disabled
      }
    }

    if (this._customer && this._customer.id) {
      this.title = 'general.titles.edition'
    } else {
      this.title = 'general.titles.creation'
    }
    this.initForm()
  }

  initForm () {
    this.formBuilderGroup = this.formBuilder.group({
      commercialValue: new FormControl({ value: (this._customer?.commercialValue || undefined), disabled: this._disabled }, [Validators.required]),
      attemptClosingDate: new FormControl({ value: (this._customer?.attemptClosingDate || undefined), disabled: this._disabled }, [Validators.required]),
      clientId: new FormControl({ value: (this._customer?.clientId || 0), disabled: this._disabled }, [Validators.required]),
      customerName: new FormControl({ value: (this._customer?.customerName || undefined), disabled: this._disabled }, [Validators.required]),
      catalogPriority: new FormControl({ value: (this._customer?.catalogPriority || 0), disabled: this._disabled }, []),
      attachedQuotePath: new FormControl({ value: (this._customer?.attachedQuotePath || undefined), disabled: this._disabled }, []),
      comments: new FormControl({ value: (this._customer?.comments || undefined), disabled: this._disabled }, []),

      contactName: new FormControl({ value: (this._customer?.contact?.name || undefined), disabled: this._disabled }, [Validators.required]),
      contactLastName: new FormControl({ value: (this._customer?.contact?.lastName || undefined), disabled: this._disabled }, []),
      contactPhoneContacts: new FormControl({ value: (this._customer?.contact?.phoneContacts[0] || undefined), disabled: this._disabled }, []),
      contactEmails: new FormControl({ value: (this._customer?.contact?.emails[0] || undefined), disabled: this._disabled }, [])
    })
  }

  onNoClick (): void {
    this.dialogRef.close()
  }

  submit () {
    if (!this.formBuilderGroup.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const customer: any = this.formBuilderGroup.value
    const outData: any = {}
    outData.id = this._customer?.id
    outData.commercialValue = customer.commercialValue
    outData.attemptClosingDate = customer.attemptClosingDate
    outData.clientId = [0, '0'].includes(customer.clientId) ? undefined : customer.clientId
    outData.customerName = customer.customerName ? customer.customerName?.trim() : undefined
    outData.catalogPriority = customer.catalogPriority
    outData.attachedQuotePath = customer.attachedQuotePath ? customer.attachedQuotePath?.trim() : undefined
    outData.comments = customer.comments ? customer.comments?.trim() : undefined

    if (customer.contactName?.trim() || customer.contactLastName?.trim() || customer.contactPhoneContacts || customer.contactEmails) {
      if (!customer.contactName?.trim()) {
        Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
        return
      }
      outData.contact = {}
      outData.contact.name = customer.contactName?.trim()
      outData.contact.lastName = customer.contactLastName?.trim()
      outData.contact.phoneContacts = customer.contactPhoneContacts ? [customer.contactPhoneContacts] : []
      outData.contact.emails = customer.contactEmails ? [customer.contactEmails] : []
    }

    outData.processId = this._process.id
    this.dialogRef.close(outData)
  }

  public clearStartDate () {
    this.formBuilderGroup.controls.text.setValue(null)
  }
}
