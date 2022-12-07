/* eslint-disable no-unused-vars */
import { IIcon } from './icon.interface'
export interface IMenu {
  isRoot: boolean
  isParent: boolean
  name: string
  routeLink?: string[]
  childs?: IMenu[]
  icon?: IIcon
  permission?: string
}
