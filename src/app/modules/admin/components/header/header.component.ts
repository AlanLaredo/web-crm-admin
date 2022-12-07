/* eslint-disable accessor-pairs */
import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { LocalService } from 'src/app/shared/services'
import { NotifyService } from '../../../../shared/services'

import Swal from 'sweetalert2'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: any
  @Input() sidenavRight: any
  _user: any
  _totalUnviewedSystemAlerts: number = 0

  @Input('user')
  set user (user: any) {
    if (user) {
      this._user = user
    }
  }

  @Input('totalUnviewedSystemAlerts')
  set totalUnviewedSystemAlerts (totalUnviewedSystemAlerts: any) {
    this._totalUnviewedSystemAlerts = totalUnviewedSystemAlerts
  }

  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private localService: LocalService,
    private router: Router,
    private notifyService: NotifyService
  ) { }

  ngOnInit () {
  }

  async logout () {
    const confirmDialog = this.confirm(this.translate.instant('header.confirmLogout'))
    confirmDialog.then((rs) => {
      if (rs.isConfirmed) {
        this.localService.clearAllItems()
        this.notifyService.notify(this.translate.instant('header.closedSession'))
        this.router.navigate(['/login'])
      }
    })
  }

  confirm (title: string) {
    return Swal.fire({
      icon: 'question',
      title,
      showConfirmButton: true,
      showCancelButton: true
    })
  }
}
