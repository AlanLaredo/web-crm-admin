/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import { Injectable } from '@angular/core'
import { Observable, of, Subject } from 'rxjs'
import _ from 'lodash'

// Own interfaces
import { IMenu } from '../../interfaces/menu'

// Own services
// import { LoginService } from '../../../auth/services' remove

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  actions : string[]
  menu: IMenu[] = []

  toggleSidenavSubject: Subject<void> = new Subject<void>()

  menuVisibilitySubject: Subject<boolean> = new Subject<boolean>()

  constructor (
    // private loginService: LoginService
  ) {
    // this.actions = this.loginService.getPermissions()
    this.actions = []

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
        permission: 'admin.home'
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
        permission: 'admin.users',
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
            permission: 'admin.users.users'
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
            permission: 'admin.users.role-permissions'
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
            permission: 'admin.users.user-role'
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
            permission: 'admin.company-group'
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
            permission: 'admin.company.company'
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
        permission: 'admin.process',
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
            permission: 'admin.process.customer'
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
            permission: 'admin.process.process'
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
        permission: 'admin.clients'
        // childs: [
        //   {
        //     isRoot: false,
        //     name: 'clientService',
        //     isParent: false,
        //     routeLink: ['/', 'admin', 'client', 'client-service'],
        //     icon: {
        //       fontIcon: 'fa-check-square',
        //       fontSet: 'fas'
        //     },
        //     permission: 'admin.client.clienty-service'
        //   },
        //   {
        //     isRoot: false,
        //     name: 'clients',
        //     isParent: false,
        //     routeLink: ['/', 'admin', 'client', 'clients'],
        //     icon: {
        //       fontIcon: 'fa-list',
        //       fontSet: 'fas'
        //     },
        //     permission: 'aadmin.client.clients'
        //   }
        // ]
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
        permission: 'admin.employee',
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
            permission: 'admin.employee.employee-reassignment'
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
            permission: 'admin.employee.employees'
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
        permission: 'admin.recruitment',
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
            permission: 'admin.recruitment.jobVacancy'
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
            permission: 'admin.recruitment.position'
          }
        ]
      },
      // {
      //   isRoot: true,
      //   name: 'catalogs',
      //   isParent: true,
      //   routeLink: ['/', 'admin', 'catalogos'],
      //   icon: {
      //     fontIcon: 'fa-list',
      //     fontSet: 'fas'
      //   },
      //   permission: 'admin.catalogs'
      // },
      {
        isRoot: true,
        name: 'operationBinnacle',
        isParent: false,
        routeLink: ['/', 'admin', 'operationBinnacle'],
        icon: {
          fontIcon: 'fa-calendar-check',
          fontSet: 'fas'
        },
        permission: 'admin.operationBinnacle'
      },
      // {
      //   isRoot: true,
      //   name: 'binnacle',
      //   isParent: false,
      //   routeLink: ['/', 'admin', 'binnacle'],
      //   icon: {
      //     fontIcon: 'fa-list-alt',
      //     fontSet: 'fas'
      //   },
      //   permission: 'admin.binnacle'
      // }
    ]
  }

  getMenu (): Observable<IMenu[]> {
    return of(this.menu)
  }

  getSecureMenu (): Observable<IMenu[]> {
    return of(this.getSubMenu(this.menu))
  }

  getSubMenu (menu: IMenu[]) {
    const secureMenu: IMenu[] = []

    menu.forEach((el: any) => {
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
