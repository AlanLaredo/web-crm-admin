import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { MenuService } from 'src/app/shared/services'

import { onSideNavChange, animateText } from '../../animations'
import { MenuLeftService } from '../../services'

@Component({
  selector: 'app-left-menu',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class MenuLeftComponent implements OnInit {
  public sideNavState: any
  public linkText: boolean = false

  menuOptions: any[] = []

  /* eslint-disable no-useless-constructor */
  constructor (
    private _menuLeftService: MenuLeftService,
    private menuService: MenuService,
    private router: Router) { }

  ngOnInit () {
    this.loadMenuOptions()
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          console.log(event)
        }
      }
    )
    // this.router.events.filter(
    //   (event: any) => event instanceof NavigationEnd).subscribe(event => {
    //   console.log(event)
    // })
  }

  loadMenuOptions () {
    this.menuService.getMenu()
      .subscribe(menuOptions => {
        this.menuOptions = menuOptions
      }) // temporal change
  }

  onSinenavToggle () {
    this.sideNavState = !this.sideNavState

    setTimeout(() => {
      this.linkText = this.sideNavState
    }, 200)
    this._menuLeftService.sideNavState$.next(this.sideNavState)
  }

  clickMenuOption (menuItem: any) {
    if (menuItem.isParent) {
      this.selectSubMenu(menuItem.permission)
    } else {
      this.navigateTo(menuItem)
    }
  }

  navigateTo (menuItem: any): void {
    this.router.navigate(menuItem.routeLink)
  }

  subMenuSelected: string = ''
  selectSubMenu (subMenuSelected: string) {
    if (this.subMenuSelected === subMenuSelected) {
      this.subMenuSelected = ''
    } else {
      this.subMenuSelected = subMenuSelected
    }
  }
}
