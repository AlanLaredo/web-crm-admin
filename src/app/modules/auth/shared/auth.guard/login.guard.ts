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
export class LoginGuard implements CanActivate {
  constructor (
    private router: Router,
    private loginService: LoginService
  ) { }

  async canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.loginService.getAccessToken()) {
      // ? There is no token
      await this.loginService.logout()
    } else if (!this.loginService.validateExpirationToken()) {
      // ? Token is expired
    } else {
      this.router.navigate(['/admin'])
    }
    return true
  }
}
