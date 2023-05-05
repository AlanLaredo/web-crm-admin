/* eslint-disable no-useless-constructor */
/* eslint accessor-pairs: ["error", { "enforceForClassMembers": false }] */

// Third Party
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { LoginService } from 'src/app/modules/auth/services'
import { InputModalComponent } from 'src/app/shared/components/input-modal'
import { v4 as uuidv4 } from 'uuid'
import * as fileSaver from 'file-saver'

import Swal from 'sweetalert2'
import { AwsFileService } from '../../services'
import { NotifyService } from 'src/app/shared/services'

@Component({
  selector: 'employee-form-component',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  clientsForCompany: any[] = []
  clientServicesForCompany: any[] = []
  positionsForClient: any[] = []
  documents: any[] = []
  user: any
  public formBuilderGroup: any = null
  _loading: boolean = false
  _data: any = {}
  _companies: any[] = []
  _positions: any[] = []
  _clients: any[] = []
  _jobVacancyDocuments: any = []
  _disableConfigurations: boolean = false

  permissions: any = {
    edit: false,
    delete: false
  }

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

  @Input('disableConfigurations')
  set disableConfigurations (disableConfigurations: boolean) {
    this._disableConfigurations = disableConfigurations
    this.initForm()
  }

  @Input('requiredDocumentsPaths')
  set requiredDocumentsPaths (requiredDocumentsPaths: any[]) {
    if (requiredDocumentsPaths && requiredDocumentsPaths.length > 0) {
      this._jobVacancyDocuments = requiredDocumentsPaths
    }
  }

  @Output()
  outActionForm: EventEmitter<any> = new EventEmitter<any>()

  @Output()
  outActionFormReasignment: EventEmitter<any> = new EventEmitter<any>()

  constructor (
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private loginService: LoginService,
    private awsFileService: AwsFileService,
    private dialog: MatDialog
  ) {
    this.user = this.loginService.getUser()
  }

  ngOnInit (): void {
    this.initForm()
  }

  initForm () {
    const companyId = !(this.user.userRole.name === 'CrmAdmin') ? this.user.companyId : this._data?.companyId || undefined
    this.formBuilderGroup = this.formBuilder.group({
      keycode: new FormControl((this._data.keycode || null), []),
      bankAccount: new FormControl((this._data.bankAccount || null), []),
      hiringDate: new FormControl((this._data.hiringDate || null), []),
      startOperationDate: new FormControl((this._data.startOperationDate || null), []),

      positionId: new FormControl({ value: (this._data.positionId || null), disabled: this._disableConfigurations }, []),
      clientId: new FormControl({ value: (this._data.clientId || null), disabled: this._disableConfigurations }, []),
      clientServiceId: new FormControl({ value: (this._data.clientServiceId || null), disabled: this._disableConfigurations }, []),
      companyId: new FormControl({ value: companyId, disabled: !(this.user.userRole.name === 'CrmAdmin') || this._disableConfigurations }, [Validators.required]),
      contactName: new FormControl({ value: (this._data.person?.name || null), disabled: this._data.person?.name === 'Vacante' }, [Validators.required]),
      contactLastName: new FormControl({ value: (this._data.person?.lastName || null), disabled: this._data.person?.name === 'Vacante'  }, []),
      contactPhoneContacts: new FormControl({ value: (this._data.person?.phoneContacts && this._data.person?.phoneContacts[0] ? this._data.person?.phoneContacts[0] : undefined), disabled: this._data.person?.name === 'Vacante' }, []),
      contactEmails: new FormControl({ value: (this._data.person?.emails && this._data.person?.emails[0] ? this._data.person?.emails[0] : null), disabled: this._data.person?.name === 'Vacante'  }, []),

      name: new FormControl((this._data.address?.name || null), []),
      street: new FormControl((this._data.address?.street || null), []),
      exteriorNumber: new FormControl((this._data.address?.exteriorNumber || null), []),
      interiorNumber: new FormControl((this._data.address?.interiorNumber || null), []),
      neightborhood: new FormControl((this._data.address?.neightborhood || null), []),
      city: new FormControl((this._data.address?.city || null), []),
      state: new FormControl((this._data.address?.state || null), []),
      country: new FormControl((this._data.address?.country || null), []),
      postalCode: new FormControl((this._data.address?.postalCode || null), [])
    })

    if (companyId) {
      this.updateClientsForCompany({ value: companyId })
    }

    if (this._data.clientId) {
      this.updatePositionsForClient({ value: this._data.clientId }, false)
    }

    if (this._data.positionId) {
      this.updateDocumentsForPosition(this._data.positionId)
    }
  }

  submitForm () {
    this.formBuilderGroup.markAllAsTouched()
    if (!this.formBuilderGroup.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.insufficientData') }).then()
      return
    }
    const employee = { ...this.formBuilderGroup.getRawValue() } as any
    const outData: any = {}

    outData.keycode = employee.keycode ? employee.keycode.trim() : undefined
    outData.bankAccount = employee.bankAccount ? employee.bankAccount.trim() : undefined
    outData.positionId = employee.positionId ? employee.positionId : undefined
    outData.hiringDate = employee.hiringDate ? employee.hiringDate : undefined
    outData.startOperationDate = employee.startOperationDate ? employee.startOperationDate : undefined
    outData.clientId = employee.clientId ? employee.clientId : null
    outData.clientServiceId = employee.clientServiceId ? employee.clientServiceId : null

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

    outData.attachedQuotePath = this._data?.attachedQuotePath || []

    if (this.newFiles) {
      outData.newFiles = this.newFiles
      this.newFiles = []
    }
    this.outActionForm.emit(outData)
  }

  updateClientsForCompany ($event: any) {
    const companyId = $event.value
    this.clientsForCompany = this._clients.filter(_client => _client.companyId === companyId)
    this.updatePositionsForClient({ value: null }, false)
  }

  async updatePositionsForClient ($event: any, checkReasignment: boolean = true) {
    let clientId = $event.value

    if (this._data.id && this._data.clientId !== clientId && checkReasignment) {
      const reason = await this.openDialogReasignment()
      if (reason) {
        this.outActionFormReasignment.emit({ clientId, reason })
      } else {
        clientId = this._data.clientId
        this.formBuilderGroup.controls.clientId.setValue(this._data.clientId)
      }
    }

    this.positionsForClient = this._positions.filter(_position => _position.clientId === clientId)
    this.updateClientServicesForClient({ value: clientId }, false)
  }

  async updateClientServicesForClient ($event: any, checkReasignment: boolean = true) {
    const clientId = $event.value
    if (clientId) {
      this.clientServicesForCompany = this._clients.find(client => client.id === clientId).clientServices
    }
  }

  async updateDocumentsForPosition ($event: any) {
    const positionId = $event.value || $event
    if (positionId && this._positions && (this._positions.length > 0 || (this._jobVacancyDocuments && this._jobVacancyDocuments.length > 0))) {
      const position = this._positions.find((element: any) => element.id === positionId) || []
      this.documents = this._data && this._data.attachedQuotePath ? this._data.attachedQuotePath.map((element: string) => ({ id: uuidv4(), document: this.getDocumentFile(element), filename: this.getFileName(element), externalPath: element })) : []
      let requiredDocuments
      if (this._jobVacancyDocuments && this._jobVacancyDocuments.length > 0) {
        requiredDocuments = this._jobVacancyDocuments.map((element: string) => ({ id: uuidv4(), document: element, filename: null, externalPath: null }))
      } else {
        requiredDocuments = position ? position?.requiredDocumentsPaths.map((element: string) => ({ id: uuidv4(), document: element, filename: null, externalPath: null })) : []
      }
      requiredDocuments.forEach((requiredDocument: any) => {
        if (!this.documents.find(element => element.document === requiredDocument.document)) {
          this.documents.push(requiredDocument)
        }
      })
      this.documents = [...this.documents]
    } else {
      this.documents = []
    }
  }

  openDialogReasignment () {
    Promise.allSettled([])
    const dialogRef = this.dialog.open(InputModalComponent, {
      width: '400px',
      disableClose: true,
      data: {
        title: this.translate.instant('employee.reasignmentReason'),
        inputName: this.translate.instant('employee.reason'),
        instructions: this.translate.instant('form.instructions.enterAText'),
        info: this.translate.instant('employee.enterAReason'),
        required: true,
        type: 'text',
        value: ''
      }
    })
    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe(result => {
        resolve(result)
      })
    })
  }

  cancelForm () {
    this.initForm()
  }

  newFiles: any[] = []
  downloadFile ($event: any) {
    this.awsFileService.getBlob($event).then((result: any) => {
      const blobFile = new window.Blob([new Uint8Array([...result]).buffer])
      fileSaver.saveAs(blobFile, this.getFileName($event))
    })
  }

  viewFile ($event: any) {
    this.awsFileService.getSignedUrl($event).subscribe((result: any) => {
      window.open(result)
    })
  }

  updateFilesForCreate ($event: any) {
    this.newFiles = $event
  }

  deleteFile ($event: any) {
    this._data.attachedQuotePath = this._data.attachedQuotePath.filter((element: string) => element !== $event)
    this.updateDocumentsForPosition(this.formBuilderGroup.controls.positionId.value)
  }

  getFileName (fileAwsKey: string): string {
    const path = fileAwsKey.split('/')[0] + '/'
    const filePath = fileAwsKey.replace(path, '')
    const fileUuid = filePath.split('_')[0]
    const documentName = filePath.split('_')[1]
    const filename = filePath.replace(fileUuid + '_' + documentName + '_', '')
    return filename
  }

  getDocumentFile (fileAwsKey: string): string {
    const path = fileAwsKey.split('/')[0] + '/'
    const filePath = fileAwsKey.replace(path, '')
    return filePath.split('_')[1]
  }

  getUuidFile (fileAwsKey: string): string {
    return fileAwsKey.replace(fileAwsKey.split('_')[0] + '_', '')
  }
}
