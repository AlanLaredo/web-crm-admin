// Third Party
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
// import gql from 'graphql-tag'
// import { map, catchError } from 'rxjs/operators'
// import { throwError } from 'rxjs'
// import { HttpErrorResponse } from '@angular/common/http'
import { Apollo } from 'apollo-angular'
import { environment } from 'src/environments/environment'
import decodeJWT from 'jwt-decode'
// import * as moment from 'moment'

// Team
// import { ITokenDecoded } from '../../shared'
import { ITokenDecoded } from '../../shared'
import { LocalService } from 'src/app/shared/services/local/local.service'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private APPLICATIONS_EXCLUDED = ['account']
  private ROLES_EXCLUDED = ['offline_access', 'manage-account', 'manage-account-links', 'view-profile', 'uma_authorization']
  private SECUTIRY_KEY = 'security'

  /* eslint-disable no-useless-constructor */
  constructor (
    private localService: LocalService,
    private apollo: Apollo,
    private httpClient: HttpClient
  ) { }

  async goToLogin () {
    this.localService.clearAllItems()
  }

  async login (access: any): Promise<any> {
    return this.getLogin(access).toPromise().then((callback: any) => {
      this.localService.setItem('token', callback.access_token)
      this.localService.setItem('user', callback.user)
      this.fetchPermissions()
      return true
    },
    err => {
      throw err
    })
  }

  private getLogin (access: any) {
    const { username, password } = access
    return this.httpClient.post(`${environment.rest_api_url}/auth/login`, null, { params: { username, password } })
  }

  private async updatePermissions () {
    const permissions = await this.httpClient.get(`${environment.rest_api_url}/auth/update`).toPromise()
    this.localService.setItem(this.SECUTIRY_KEY, permissions)
  }

  getUserID (): string {
    return ''
  }

  isLoggedIn (): boolean {
    return false
  }

  getAccessToken (): string | any {
    const token = this.localService.getItem('token')
    if (token) {
      return token
    } else {
      return null
    }
  }

  getTokenDecoded () : ITokenDecoded {
    return decodeJWT(this.getAccessToken())
  }

  validateExpirationToken () {
    const exp = this.isExpired(this.getTokenDecoded().exp)
    return !exp
  }

  private isExpired (exp: number) {
    const now = new Date().getTime()
    return exp < (now / 1000)
  }

  logout () {
  }

  getUser () {
    return this.localService.getItem('user')
  }

  public getOAuthUserData () {

  }

  async fetchPermissions () {
    const { permissions } = this.getTokenDecoded()
    // if (applicationsData) {
    //   permissionsModules = applicationsData.permission_modules.map(item => item.display_name)
    //   permissionsActions = applicationsData.permissions.map(item => item.display_name)
    //   permissionsAll = [...permissionsModules, ...permissionsActions]

    //   // tslint:disable-next-line: one-variable-per-declaration prefer-const
    //   applicationsData.roles.forEach(role => {
    //     const permissionsArray = role.permission_role.map(item => item.display_name)

    //     roles.push(role.display_name)
    //     rolesPermissions.push([role.display_name, permissionsArray])
    //   })
    // }

    // const security = {
    //   permissionsModules,
    //   permissionsActions,
    //   permissionsAll,
    //   roles,
    //   rolesPermissions
    // }
    this.localService.setItem(this.SECUTIRY_KEY, permissions)

    // return security
    // */
  }

  getPermissions () {
    this.updatePermissions()

    const permissions = this.localService.getItem<any>(this.SECUTIRY_KEY)
    if (permissions) {
      return permissions.map((permission: any) => permission.tag)
    } else {
      return []
    }
  }
}
