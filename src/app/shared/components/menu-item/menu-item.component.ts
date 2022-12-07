/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable accessor-pairs */
// Third Party
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

// Own types
import { menuOrientationType } from '../../../shared/types'

// Own interfaces
import { IMenu } from '../../interfaces'

@Component({
  selector: 'menu-item-component',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  _orientation: menuOrientationType = 'horizontal'

  @Input() menuItem: any

  @Input()
  set orientation (_orientation: menuOrientationType) {
    this._orientation = _orientation
  }

  @Input()
  active: boolean = false

  @Output()
  menuItemSelected: EventEmitter<IMenu> = new EventEmitter<IMenu>()

  constructor (private translate: TranslateService) {
  }

  onMenuItemSelected (menuItem: IMenu) {
    this.menuItemSelected.emit(menuItem)
  }
}
