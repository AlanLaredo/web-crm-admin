/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
// Third Party
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core'
// Own Models
import { IMenu } from '../../interfaces'

@Component({
  selector: 'sub-menu-item-component',
  templateUrl: './sub-menu-item.component.html',
  styleUrls: ['./sub-menu-item.component.scss']
})
export class SubMenuItemComponent {
  @Input() subMenu: IMenu[] = []
  @Output() subMenuSelected: EventEmitter<IMenu> = new EventEmitter<IMenu>()
  @ViewChild('childMenu', { static: true }) public childMenu: any

  constructor () {}

  onSubItemSelected (menuItem: IMenu) {
    this.subMenuSelected.emit(menuItem)
  }
}
