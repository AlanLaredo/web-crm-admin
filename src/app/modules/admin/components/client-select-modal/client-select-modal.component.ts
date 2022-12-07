/* eslint-disable no-useless-constructor */
// Third Party
import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { IClient } from '../../models/data'

@Component({
  selector: 'client-select-modal-component',
  templateUrl: './client-select-modal.component.html',
  styleUrls: ['./client-select-modal.component.scss']
})
export class ClientSelectModalComponent {
  _loading: boolean = false
  selectedValue: any = null

  constructor (
    public translate: TranslateService,
    public dialogRef: MatDialogRef<ClientSelectModalComponent>,
    @Inject(MAT_DIALOG_DATA) public _clients: IClient[]) {}

  onNoClick (): void {
    this.dialogRef.close()
  }

  submit () {
    this.dialogRef.close(this.selectedValue)
  }
}
