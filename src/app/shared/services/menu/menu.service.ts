/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import { Injectable } from '@angular/core'
import { Observable, of, Subject } from 'rxjs'
import _ from 'lodash'

// Own interfaces
import { IMenu } from '../../interfaces/menu'
import { LoginService } from 'src/app/modules/auth/services'

// Own services

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  actions : string[]
  menu: IMenu[] = []

  toggleSidenavSubject: Subject<void> = new Subject<void>()

  menuVisibilitySubject: Subject<boolean> = new Subject<boolean>()

  constructor (
    private loginService: LoginService
  ) {
    this.actions = this.loginService.getPermissions()
    this.menu = [
      {
        isRoot: true,
        name: 'home',
        isParent: false,
        routeLink: ['/', 'admin', 'home'],
        icon: {
          fontIcon: 'fa-home',
          fontSet: 'fas'
        },
        permission: 'home'
      },
      {
        isRoot: true,
        name: 'security',
        isParent: true,
        routeLink: ['/', 'admin', 'security'],
        icon: {
          fontIcon: 'fa-shield-alt',
          fontSet: 'fas'
        },
        permission: 'users',
        childs: [
          {
            isRoot: false,
            name: 'users',
            isParent: false,
            routeLink: ['/', 'admin', 'security', 'users'],
            icon: {
              fontIcon: 'fa-user',
              fontSet: 'fas'
            },
            permission: 'users'
          },
          {
            isRoot: false,
            name: 'permission',
            isParent: false,
            routeLink: ['/', 'admin', 'security', 'role-permissions'],
            icon: {
              fontIcon: 'fa-user-shield',
              fontSet: 'fas'
            },
            permission: 'roles'
          },
          {
            isRoot: false,
            name: 'userRole',
            isParent: false,
            routeLink: ['/', 'admin', 'security', 'user-role'],
            icon: {
              fontIcon: 'fa-users',
              fontSet: 'fas'
            },
            permission: 'roles'
          }
        ]
      },
      {
        isRoot: true,
        name: 'company',
        isParent: true,
        routeLink: ['/', 'admin', 'company'],
        icon: {
          fontIcon: 'fa-building',
          fontSet: 'fas'
        },
        permission: 'admin.company',
        childs: [
          {
            isRoot: false,
            name: 'companyGroup',
            isParent: false,
            routeLink: ['/', 'admin', 'company', 'company-group'],
            icon: {
              fontIcon: 'fa-object-group',
              fontSet: 'fas'
            },
            permission: 'companyGroups'
          },
          // {
          //   isRoot: false,
          //   name: 'companyUser',
          //   isParent: false,
          //   routeLink: ['/', 'admin', 'company', 'company-user'],
          //   icon: {
          //     fontIcon: ' fa-users',
          //     fontSet: 'fas'
          //   },
          //   permission: 'admin.company.company-user'
          // },
          {
            isRoot: false,
            name: 'company',
            isParent: false,
            routeLink: ['/', 'admin', 'company', 'company'],
            icon: {
              fontIcon: 'fa-list',
              fontSet: 'fas'
            },
            permission: 'company'
          }
        ]
      },
      {
        isRoot: true,
        name: 'process',
        isParent: true,
        routeLink: ['/', 'admin', 'process'],
        icon: {
          fontIcon: 'fa-cubes',
          fontSet: 'fas'
        },
        permission: 'customers',
        childs: [
          {
            isRoot: false,
            name: 'customer',
            isParent: false,
            routeLink: ['/', 'admin', 'process', 'customer'],
            icon: {
              fontIcon: 'fa-users',
              fontSet: 'fas'
            },
            permission: 'customers'
          },
          {
            isRoot: false,
            name: 'process',
            isParent: false,
            routeLink: ['/', 'admin', 'process', 'process'],
            icon: {
              fontIcon: 'fa-list',
              fontSet: 'fas'
            },
            permission: 'operations'
          }
        ]
      },
      {
        isRoot: true,
        name: 'client',
        isParent: false,
        routeLink: ['/', 'admin', 'clients'],
        icon: {
          fontIcon: 'fa-store',
          fontSet: 'fas'
        },
        permission: 'clients'
      },
      {
        isRoot: true,
        name: 'employee',
        isParent: true,
        routeLink: ['/', 'admin', 'employee'],
        icon: {
          fontIcon: 'fa-male',
          fontSet: 'fas'
        },
        permission: 'employees',
        childs: [
          {
            isRoot: false,
            name: 'reassignment',
            isParent: false,
            routeLink: ['/', 'admin', 'employee', 'employee-reassignment'],
            icon: {
              fontIcon: 'fa-refresh',
              fontSet: 'fas'
            },
            permission: 'employees'
          },
          {
            isRoot: false,
            name: 'employee',
            isParent: false,
            routeLink: ['/', 'admin', 'employee', 'employees'],
            icon: {
              fontIcon: 'fa-list',
              fontSet: 'fas'
            },
            permission: 'employees'
          }
        ]
      },
      {
        isRoot: true,
        name: 'recruitment',
        isParent: true,
        routeLink: ['/', 'admin', 'recruitment'],
        icon: {
          fontIcon: 'fa-flag-checkered',
          fontSet: 'fas'
        },
        permission: 'jobVavancy',
        childs: [
          {
            isRoot: false,
            name: 'jobVacancy',
            isParent: false,
            routeLink: ['/', 'admin', 'recruitment', 'job-vacancies'],
            icon: {
              fontIcon: 'fa-address-book',
              fontSet: 'fas'
            },
            permission: 'jobVavancy'
          },
          {
            isRoot: false,
            name: 'position',
            isParent: false,
            routeLink: ['/', 'admin', 'recruitment', 'position'],
            icon: {
              fontIcon: 'fa-address-card',
              fontSet: 'fas'
            },
            permission: 'positions'
          }
        ]
      },
      {
        isRoot: true,
        name: 'operationBinnacle',
        isParent: false,
        routeLink: ['/', 'admin', 'operation-binnacle'],
        icon: {
          fontIcon: 'fa-calendar-check',
          fontSet: 'fas'
        },
        permission: 'operation-binnacle'
      },
      {
        isRoot: true,
        name: 'nomina',
        isParent: false,
        routeLink: ['/', 'admin', 'nomina'],
        icon: {
          fontIcon: 'fa-money-bills',
          fontSet: 'fas'
        },
        permission: 'prenominal'
      }
    ]
  }

  getMenu (): Observable<IMenu[]> {
    return of(this.menu)
  }

  getSecureMenu (): Observable<IMenu[]> {
    this.actions = this.loginService.getPermissions()

    console.log(this.actions)
    return of(this.getSubMenu(this.menu))
  }

  getSubMenu (menu: IMenu[]) {
    const secureMenu: IMenu[] = []

    menu?.forEach((el: any) => {
      if (el.permission) {
        if (this.actions.indexOf(el.permission) >= 0) {
          const childs: IMenu[] = this.getSubMenu(el.childs)
          if (childs && childs.length > 0) {
            secureMenu.push({
              isRoot: el.isRoot,
              isParent: true,
              name: el.name,
              routeLink: el.routeLink,
              childs: childs,
              icon: el.icon,
              permission: el.permission
            })
          } else {
            secureMenu.push({
              isRoot: el.isRoot,
              isParent: false,
              name: el.name,
              routeLink: el.routeLink,
              childs: [],
              icon: el.icon,
              permission: el.permission
            })
          }
        }
      }
    })

    return secureMenu
  }

  toogleSidenav () {
    this.toggleSidenavSubject.next()
  }

  onToogleSidenav () {
    return this.toggleSidenavSubject
  }

  setMenuVisibility (opened: boolean) {
    this.menuVisibilitySubject.next(opened)
  }

  onMenuVisibility () {
    return this.menuVisibilitySubject
  }
}
