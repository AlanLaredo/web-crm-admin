/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */

import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'
import { SnackBarComponent } from '../../components'

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  constructor (
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  /*
  status: success || error
   */
  public notify (message: string = '', status: string = 'info') {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message,
        status
      },
      duration: 6000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snackbar-light']
    })
  }

  public async deleteConfirm (): Promise<boolean> {
    const { isConfirmed } = await Swal.fire({
      icon: 'question',
      title: this.translate.instant('messages.delete.confirmQuestion'),
      showConfirmButton: true,
      showCancelButton: true
    })
    return isConfirmed
  }
}
