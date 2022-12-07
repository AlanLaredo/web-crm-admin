import { IUserPermissionConfig } from 'src/app/modules/security/interfaces/user-permission-config.interface'
import { IRoleAccess } from './role-access.interface'

export interface IUser {
  username: string
  email: string
  id: string
  firstName: string
  lastName: string
  roleName: string
  roleAccessId: string
  fullName?: string
  password?: string
  permissionsConfig?: IUserPermissionConfig[]
  permissionIds?: string[]
  roleAccess: IRoleAccess
}
