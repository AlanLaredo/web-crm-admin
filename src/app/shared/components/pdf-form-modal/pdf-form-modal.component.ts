/* eslint-disable no-useless-constructor */
/* eslint-disable accessor-pairs */

import { AfterViewInit, Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
// import { DateTime } from 'luxon'

@Component({
  selector: 'pdf-form-modal-component',
  templateUrl: './pdf-form-modal.component.html',
  styleUrls: ['./pdf-form-modal.component.scss']
})
export class PdfFormModalComponent implements AfterViewInit {
  _loading: boolean = false
  _data: any = {
    title: '',
    instructions: '',
    value: null,
    signatureAdminName: 'Crm amdinistrator',
    maintenanceVisits: 1,
    monitoringVisits: 1,
    totalVisits: 2,
    initialVisit: true
  }

  public formBuilderGroup: any = null

  constructor (
    public translate: TranslateService,
    public dialogRef: MatDialogRef<PdfFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this._data.title = data.title
      this._data.instructions = data.instructions
      this._data.value = data.value

      this._data.clientName = data.clientName
      this._data.typeClientName = data.typeClientName
      this._data.socialReazon = data.socialReazon
      this._data.email = data.email
      this._data.managerName = data.managerName
      this._data.phone = data.phone

      this._data.postalCode = data.postalCode
      this._data.street = data.street
      this._data.colony = data.colony
      this._data.state = data.state
      this._data.municipality = data.municipality
      this._data.dateRangeString = data.rangeYears
    }
  }

  ngAfterViewInit (): void {
    const element = document.getElementById('preview-element-calendar')
    if (element) {
      const regex = /"mat-card/ig
      element.innerHTML = this._data.value.innerHTML.replaceAll(regex, '" ')
    }
  }

  onNoClick (): void {
    this.dialogRef.close()
  }

  submit () {
    this.generatePdf()
  }

  async generatePdf () {
    // const date = DateTime.now()
    const element = document.getElementById('calendar-pdf-element')
    if (element) {
      const canvas = await html2canvas(element)
      // const fileWidth = 208
      // const fileHeight = canvas.height * fileWidth / canvas.width
      const FILEURI = canvas.toDataURL('image/png')
      /* eslint-disable new-cap */
      const pdf = new jsPDF('l', 'px', 'a4')
      const position = 0
      pdf.addImage(FILEURI, 'PNG', 0, position, 630, 440)
      pdf.save(this._data.title + '.pdf')
    }
  }
}
