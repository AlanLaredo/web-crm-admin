/* eslint-disable no-useless-constructor */
// Third Party
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http'
import Swal from 'sweetalert2'

// Team
import { LoginService } from '../../services'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'

@Component({
  templateUrl: './login.container.html',
  styleUrls: ['./login.container.scss']
})
export class LoginContainer {
  loading: boolean = true
  constructor (
    private loginService: LoginService,
    private router: Router,
    private titleService: Title,
    private translate: TranslateService
  ) {
    this.titleService.setTitle(this.translate.instant('login.pageTitle') + ' - ' + this.translate.instant('applicationTitle'))
    setTimeout(() => {
      this.loading = false
    }, 0)
  }

  public login (loginData: any) {
    this.loading = true
    this.loginService.login(loginData).then((callback: any) => {
      this.router.navigate(['/admin'])
    }, (error: HttpErrorResponse) => {
      if (error.status === 401) {
        Swal.fire({ icon: 'warning', titleText: 'Las credenciales no son validas' }).then()
      } else if (error.status !== 0) {
        Swal.fire({ icon: 'warning', titleText: error.error.message }).then()
      }
    })
  }
}
