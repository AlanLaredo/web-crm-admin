/* eslint-disable accessor-pairs */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { DateTime } from 'luxon'
import { MenuService, NotifyService } from 'src/app/shared/services'
import Swal from 'sweetalert2'

import { onSideNavChange, animateText } from '../../animations'
import { ISystemAlert } from '../../models/data'
import { MenuRightService } from '../../services'

@Component({
  selector: 'app-right-menu',
  templateUrl: './menu-right.component.html',
  styleUrls: ['./menu-right.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class MenuRightComponent implements OnInit {
  public sideNavState: any
  public linkText: boolean = false
  _systemAlerts: any[] = []

  @Input('systemAlerts')
  set systemAlerts (systemAlerts: any) {
    if (systemAlerts) {
      this._systemAlerts = this.processSystemAlerts(this.sortByDueDate(systemAlerts))
    }
  }

  @Output()
  outActionDelete: EventEmitter<string> = new EventEmitter<string>()

  @Output()
  outActionView: EventEmitter<string> = new EventEmitter<string>()

  menuOptions: any[] = []
  user: any
  /* eslint-disable no-useless-constructor */
  constructor (
    private _menuRightService: MenuRightService,
    private menuService: MenuService,
    private translate: TranslateService,
    private notifyService: NotifyService,
    private router: Router) { }

  ngOnInit () {
  }

  processSystemAlerts (systemAlerts: ISystemAlert[]) {
    return systemAlerts.map((systemAlert: ISystemAlert) => {
      const systemAlertProcessed: any = {
        ...systemAlert,
        createdAtString: systemAlert.createdAt ? DateTime.fromJSDate(new Date(systemAlert.createdAt)).setLocale(this.translate.instant('lang.luxon')).toFormat('DDDD\',\' hh:mm a') : null,
        seeMore: (['overdueVisits', 'authorizationCode']).includes(systemAlert.name)
      }
      switch (systemAlert.description) {
        case 'afterHoursActivity':
          systemAlertProcessed.notificationInfo = this.processAfterHoursActivityInfo(systemAlert)
          systemAlertProcessed.notificationInfoExtended = ''
          break
        default:
          systemAlertProcessed.notificationInfo = 'Sin contenido'
          systemAlertProcessed.notificationInfoExtended = ''
          break
      }

      return systemAlertProcessed
    })
  }

  processOverdueVisitInfo (systemAlert: ISystemAlert) {
    let description: any = ''
    const visit = systemAlert.systemAlertOverdueVisit

    description = visit.project.client.name + ' presenta un adeudo en el'
    description += ' proyecto #' + visit.project.folio + ', visita' + ' (' + this.translate.instant('systemAlerts.' + visit.typeVisit) + ')' + ' del ' + (visit.date ? DateTime.fromJSDate(new Date(visit.date)).setLocale(this.translate.instant('lang.luxon')).toFormat('DDDD \'a las \' hh:mm a') : 'N/A')

    return description
  }

  processAfterHoursActivityInfo (systemAlert: ISystemAlert) {
    let description: any = ''
    const user = systemAlert.systemAlertAfterHoursActivityUser
    const createdAtString: string = DateTime.fromJSDate(new Date(systemAlert.createdAt ? systemAlert.createdAt : new Date())).setLocale(this.translate.instant('lang.luxon')).toFormat('hh:mm a')
    description = 'El usuario ' + user.firstName + ' ' + user.lastName + ' (' + user.username + ') ha tenido actividad a las ' + createdAtString
    return description
  }

  view (id: string) {
    this.outActionView.emit(id)
  }

  delete (id: string) {
    Swal.fire({
      icon: 'question',
      title: this.translate.instant('messages.delete.confirmQuestion'),
      showConfirmButton: true,
      showCancelButton: true
    }).then((rs) => {
      if (rs.isConfirmed) {
        this.outActionDelete.emit(id)
      }
    })
  }

  seeMore (text: string) {
    Swal.fire({ icon: 'info', title: this.translate.instant('systemAlerts.detail'), text }).then()
  }

  sortByDueDate (dates: ISystemAlert[]) {
    dates.sort((b: ISystemAlert, a: ISystemAlert) => {
      return DateTime.fromJSDate(a.createdAt ? new Date(a.createdAt) : new Date()).valueOf() - DateTime.fromJSDate(b.createdAt ? new Date(b.createdAt) : new Date()).valueOf()
    })
    return dates
  }
}
