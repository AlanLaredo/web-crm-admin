/* eslint-disable no-useless-constructor */
// Third Party
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from 'src/app/modules/auth/services'

@Component({
  templateUrl: './dashboard.container.html',
  styleUrls: ['./dashboard.container.scss']
})
export class DashboardContainer implements OnInit {
  email: string = ''
  constructor (
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit () {
    const user: any = this.loginService.getUser()
    this.email = user.email
  }
}
