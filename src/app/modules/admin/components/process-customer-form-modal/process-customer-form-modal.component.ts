/* eslint-disable no-useless-constructor */
/* eslint-disable accessor-pairs */
import { Component, Inject } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'
import * as fileSaver from 'file-saver'

import { LoginService } from 'src/app/modules/auth/services'
import { AwsFileService } from '../../services'
import { NotifyService } from 'src/app/shared/services'

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
  fileNameString: string = ''

  title: string =''
  public formBuilderGroup: any = null

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    public awsFileService: AwsFileService,
    public loginService: LoginService,
    public notifyService: NotifyService,
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
      comments: new FormControl({ value: (this._customer?.comments || undefined), disabled: this._disabled }, []),

      contactName: new FormControl({ value: (this._customer?.contact?.name || undefined), disabled: this._disabled }, [Validators.required]),
      contactLastName: new FormControl({ value: (this._customer?.contact?.lastName || undefined), disabled: this._disabled }, []),
      contactPhoneContacts: new FormControl({ value: (this._customer?.contact?.phoneContacts[0] || undefined), disabled: this._disabled }, []),
      contactEmails: new FormControl({ value: (this._customer?.contact?.emails[0] || undefined), disabled: this._disabled }, [])
    })

    if (this._customer?.attachedQuotePath && this._customer?.attachedQuotePath.length > 0) {
      const replaceUUIDAndPath = this._customer?.attachedQuotePath[0].split('_')[0] + '_'
      this.fileNameString = this._customer?.attachedQuotePath[0].replace(replaceUUIDAndPath, '')
    }
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
    outData.clientId = [0, '0'].includes(customer.clientId) ? null : customer.clientId
    outData.customerName = customer.customerName ? customer.customerName?.trim() : undefined
    outData.catalogPriority = customer.catalogPriority
    outData.attachedQuotePath = customer.attachedQuotePath ? customer.attachedQuotePath : undefined
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

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      outData.selectedFiles = this.selectedFiles
    } else if (this._customer?.attachedQuotePath === null) {
      outData.attachedQuotePath = null
    }

    this.dialogRef.close(outData)
  }

  public clearStartDate () {
    this.formBuilderGroup.controls.text.setValue(null)
  }

  onFileComplete ($event: any) {

  }

  selectedFiles: any[] = []
  uploadFile ($event: any) {
    if (!$event.data) {
      return
    }
    this.selectedFiles.push($event.data)
  }

  removeTemporalFile ($event: any) {
    const index = $event
    if (index > -1) {
      this.selectedFiles.splice(index, 1)
    }
  }

  async download () {
    this._loading = true
    if (this._customer?.attachedQuotePath && this._customer?.attachedQuotePath.length > 0) {
      const result: any = await this.awsFileService.getBlob(this._customer.attachedQuotePath[0])
      this._loading = false
      const blobFile = new window.Blob([new Uint8Array([...result]).buffer])
      fileSaver.saveAs(blobFile, this.fileNameString)
    }
  }

  async delete () {
    this._loading = true
    if (await this.notifyService.deleteConfirm() && this._customer?.attachedQuotePath && this._customer?.attachedQuotePath.length > 0) {
      this.awsFileService.delete(this._customer?.attachedQuotePath[0])
      this._loading = false
      this._customer.attachedQuotePath = null
      this.submit()
    }
  }

  view () {
    if (this._customer?.attachedQuotePath && this._customer?.attachedQuotePath.length > 0) {
      this.awsFileService.getSignedUrl(this._customer?.attachedQuotePath[0]).subscribe((result: any) => {
        window.open(result)
      })
    }
  }
}
