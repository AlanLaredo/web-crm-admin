/* eslint-disable no-useless-constructor */

// Third Party
import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router
} from '@angular/router'

// import Swal from 'sweetalert2'

// Team
import { LoginService } from '../../services'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private router: Router,
    private loginService: LoginService
  ) { }

  async canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isValidAccess = false

    if (!this.loginService.getAccessToken()) {
      this.router.navigate(['/login'])
      await this.loginService.logout()
    } else if (!this.loginService.validateExpirationToken()) {
      this.router.navigate(['/login'])
      isValidAccess = false
    } else {
      isValidAccess = true
    }
    return isValidAccess
  }
}
