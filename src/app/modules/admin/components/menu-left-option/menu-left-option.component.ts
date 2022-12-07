import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MenuLeftService } from 'src/app/shared/services'

import { onSideNavChange, animateText } from '../../animations'

@Component({
  selector: 'menu-left-option-component',
  templateUrl: './menu-left-option.component.html',
  styleUrls: ['./menu-left-option.component.scss'],
  animations: [onSideNavChange, animateText]

})
export class MenuLeftOptionComponent implements OnInit {
  @Input('menuOptions')
  set menuOptions (menuOptions: any[]) {
    this._menuOptions = menuOptions
  }

  get menuOptions () {
    return this._menuOptions
  }

  @Input('linkText')
  set linkText (linkText: boolean) {
    this._linkText = linkText
  }

  get linkText () {
    return this._linkText
  }

  _menuOptions: any[] = []
  public _linkText: boolean = false
  public sideNavState: any

  /* eslint-disable no-useless-constructor */
  constructor (
    private router: Router,
    private _menuLeftService: MenuLeftService) { }

  ngOnInit () {
  }

  navigateTo (menuItem: any): void {
    if (!menuItem.isParent && menuItem.routeLink) {
      this.router.navigate(menuItem.routeLink)
    }
  }

  onSinenavToggle () {
    this.sideNavState = !this.sideNavState

    setTimeout(() => {
      this.linkText = this.sideNavState
    }, 200)
    this._menuLeftService.sideNavState$.next(this.sideNavState)
  }
}
