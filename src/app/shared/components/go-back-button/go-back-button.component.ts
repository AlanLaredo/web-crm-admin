import { Component } from '@angular/core'
import { Location } from '@angular/common'

/**
 * @title Go back button
 */
@Component({
  selector: 'go-back-button-component',
  templateUrl: './go-back-button.component.html',
  styleUrls: ['./go-back-button.component.scss']

})
export class GoBackButtonComponent {
/* eslint-disable no-useless-constructor */
  constructor (
    private location: Location
  ) {}

  public goBack () {
    this.location.back()
  }
}
