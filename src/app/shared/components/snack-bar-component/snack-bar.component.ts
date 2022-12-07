import { Component, Inject } from '@angular/core'
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'

@Component({
  selector: 'snack-bar-component',
  templateUrl: 'snack-bar.component.html',
  styles: [
    `
    .tiny-icon-snackbar {
      font-size: 21px;
      padding-top: 0px;
      margin-bottom: 17px;
    }
  `
  ]
})
export class SnackBarComponent {
  /* eslint-disable no-useless-constructor */
  message: string = ''
  resultClass: string = ''
  icon: string = ''
  constructor (
    public snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
    this.message = data.message
    this.resultClass = data && data.status === 'success' ? 'text-success' : data.status === 'error' ? 'text-warning' : ''
    this.icon = data && data.status === 'success' ? 'check' : data.status === 'error' ? 'warning' : 'info'
  }
}
