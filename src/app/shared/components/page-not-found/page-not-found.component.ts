import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  /* eslint-disable no-useless-constructor */
  constructor (private location: Location) { }

  ngOnInit () {
  }

  public goBack () {
    this.location.back()
  }
}
