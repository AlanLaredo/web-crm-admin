/* eslint-disable no-useless-constructor */
// Third Party
import { Component, Output, EventEmitter, Input } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

import { IPermission } from 'src/app/shared/interfaces'
import { ICategoryPermission } from '../../interfaces/category-permission.interface'

@Component({
  selector: 'select-permissions-by-category-component',
  templateUrl: './select-permissions-by-category.component.html',
  styleUrls: ['./select-permissions-by-category.component.scss']
})
export class SelectPermissionsByCategoryComponent {
  _loading: boolean = false
  _data: IPermission[] = []
  permissionsByCategory: ICategoryPermission[] = []
  _currentPermissions: string[] = []

  @Input('data')
  set data (data: IPermission[]) {
    this._data = data
    this.processPermissions()
  }

  get data () {
    return this._data
  }

  @Input('currentPermissions')
  set currentPermissions (currentPermissions: string[]) {
    this._currentPermissions = currentPermissions || []
    this.processPermissions()
  }

  get currentPermissions () {
    return this._currentPermissions
  }

  @Input('loading')
  set loading (loading: boolean) {
    this._loading = loading
  }

  get loading () {
    return this.loading
  }

  @Output()
  outPermissionSettings: EventEmitter<string[]> = new EventEmitter<string[]>()

  constructor (
    public translate: TranslateService
  ) { }

  processPermissions () {
    this.permissionsByCategory = []
    const permissions = this._data
    permissions.forEach((permission) => {
      const permissionSeparate = permission.tag.split('.')
      const existCategory = this.permissionsByCategory.find((element: any) => {
        return element.name === permissionSeparate[0]
      })
      if (!existCategory) {
        this.permissionsByCategory.push({
          name: permissionSeparate[0],
          permissions: [
            { ...permission, selected: this._currentPermissions.indexOf(permission.id) !== -1 }
          ]
        })
      } else {
        this.permissionsByCategory.map((element: any) => {
          if (element.name === permissionSeparate[0]) {
            element.permissions.push({ ...permission, selected: this._currentPermissions.indexOf(permission.id) !== -1 })
          }
          return element
        })
      }
    })
  }

  catchOptionsSelected (options: any, module: string) {
    const permissionsSelected = options.source._value
    this.permissionsByCategory.map(
      (permissionCategory) => {
        if (permissionCategory.name === module) {
          permissionCategory.permissions.map(permission => {
            permission.selected = permissionsSelected.indexOf(permission.id) !== -1
            return permission
          })
        }
        return permissionCategory
      })

    this.getConfigurationPermissions()
  }

  getConfigurationPermissions () {
    const permissionsSettings: string[] = []
    this.permissionsByCategory.forEach(category => category.permissions.forEach(element => element.selected ? permissionsSettings.push(element.id) : false))
    this.outPermissionSettings.emit(permissionsSettings)
  }
}
