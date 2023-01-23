/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable accessor-pairs */
// Third Party
import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'

// Own Types

// import { LoginService } from '../../../auth/services'
import { menuOrientationType } from '../../../shared/types'

// Own Interfaces
import { MenuService } from '../../services'
import { IMenu } from '../../interfaces/menu'

@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  selector: 'menu-component'
})
export class MenuComponent implements OnInit {
  _orientation: menuOrientationType = 'horizontal'

  @Input()
  set orientation (_orientation: menuOrientationType) {
    this._orientation = _orientation
  }

  menu: IMenu[] = []

  constructor (
    private router: Router,
    private menuService: MenuService
    // private loginService: LoginService
  ) {
  }

  ngOnInit () {
    // this.loginService.permissionsUpdate.subscribe((isUpdated: any) => {
    //   if (isUpdated) {
    //     this.menuService.getMenu()
    //       .subscribe(menu => {
    //         this.menu = menu
    //       })
    //   }
    // })

    this.menuService.getSecureMenu()
      .subscribe(menu => {
        this.menu = menu
      })
  }

  isRouteActive (routeLink: string[] | undefined): boolean {
    let menuUrl: string = ''

    if (routeLink) {
      if (routeLink.length && routeLink[0] === '/') {
        menuUrl = `${routeLink[0]}${routeLink.slice(1, routeLink.length).join('/')}`
      }
      return this.router.url.startsWith(menuUrl)
    }
    return false
  }

  navigateTo (menuItem: IMenu): void {
    if (!menuItem.isParent && menuItem.routeLink) {
      this.router
        .navigate(menuItem.routeLink)
    }
  }
}
