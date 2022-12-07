/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { DateTime } from 'luxon'
import { LoginService } from 'src/app/modules/auth/services'
import { MenuLeftService, MenuRightService, NotifyService } from 'src/app/shared/services'
import { onMainContentChange } from '../../animations'
import { ISystemAlert } from '../../models/data'
import { SystemAlertService } from '../../services'

@Component({
  templateUrl: './main.container.html',
  styleUrls: ['./main.container.scss'],
  animations: [onMainContentChange]
})
export class MainContainer implements OnInit {
  isLoading: boolean = false
  isNotChrome: boolean = true
  browserAlertAdvised: boolean = false
  opened: boolean = true
  public onSideNavChange: boolean = false
  public onSideNavRightChange: boolean = false
  systemAlerts: ISystemAlert[] = []
  totalUnviewedSystemAlerts: number = 0
  user: any

  constructor (
    private translate: TranslateService,
    private menuLeftService: MenuLeftService,
    private menuRightService: MenuRightService,
    private loginService: LoginService,
    private notifyService: NotifyService,
    private systemAlertService: SystemAlertService
  ) {
    this.menuLeftService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res
    })
    this.menuRightService.sideNavState$.subscribe(res => {
      this.onSideNavRightChange = res
    })
  }

  ngOnInit () {
    if (navigator.userAgent.indexOf('Chrome') !== -1) {
      this.isNotChrome = false
    } else {
      this.browserAlert()
    }
    this.user = this.loginService.getUser()
    this.loadSystemAlerts()
  }

  loadSystemAlerts () {
    // this.getSystemAlerts().then(result => {
    //   this.systemAlerts = result
    //   this.setUnviewedSystemAlerts()
    //   setTimeout(() => {
    //     this.loadSystemAlerts()
    //   }, 180000)
    // })
  }

  removeSystemAlert ($event: any) {
    const id = $event
    this.deleteSystemAlert(id).then((result: any) => {
      this.systemAlerts = this.systemAlerts.filter((systemAlert: ISystemAlert) => systemAlert.id !== result.id)
      this.systemAlerts = [...this.systemAlerts]
      this.setUnviewedSystemAlerts()
    })
  }

  deleteSystemAlert (id: string) {
    return new Promise((resolve, reject) => {
      this.systemAlertService.remove(id).subscribe(
        (result: any) => {
          resolve(result)
        }
      )
    })
  }

  viewSystemAlert ($event: any) {
    const systemAlert = {
      id: $event,
      viewedAt: DateTime.now()
    }
    this.updateSystemAlert(systemAlert).then((result: ISystemAlert) => {
      this.systemAlerts = this.systemAlerts.map((systemAlert: ISystemAlert) => {
        if (systemAlert.id === result.id) {
          systemAlert = result
        }
        return systemAlert
      })
      this.systemAlerts = [...this.systemAlerts]
      this.setUnviewedSystemAlerts()
    })
  }

  updateSystemAlert (data: any): Promise<ISystemAlert> {
    return new Promise((resolve, reject) => {
      this.systemAlertService.update({ ...data }).subscribe(
        (result: any) => {
          resolve(result)
        }
      )
    })
  }

  setUnviewedSystemAlerts () {
    if (this.systemAlerts) {
      const UVSystemAlerts = this.systemAlerts.filter((systemAlert: ISystemAlert) => !systemAlert.viewedAt)
      this.totalUnviewedSystemAlerts = UVSystemAlerts.length
    }
  }

  getSystemAlerts (): Promise<ISystemAlert[]> {
    return new Promise((resolve, reject) => {
      this.systemAlertService.listBySession().subscribe((systemAlerts: ISystemAlert[]) => {
        resolve(systemAlerts)
      })
    })
  }

  onOpenedChange (opened: any) {
    this.opened = opened
  }

  browserAlert () {
    const browserAlert = localStorage.getItem('browserAlert')
    if (browserAlert && browserAlert === 'advised') {
      this.browserAlertAdvised = true
    } else {
      this.browserAlertAdvised = false
    }
    // setTimeout(() => {
    // const message = this.translate.instant('messages.warningBrowser')
    // if (message !== 'messages.warningBrowser') {
    // Swal.fire({
    //   icon: 'warning',
    //   titleText: message
    // }).then(() => localStorage.setItem('browserAlert', 'advised'))
    // } else {
    //   this.browserAlert()
    // }
    // }, 1000)
  }
}
