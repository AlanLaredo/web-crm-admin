import { IClient, IImage, ISystemAlert } from 'src/app/modules/admin/models/data'
import { IUser, IPermission } from './'
import { IGenericResult } from './generic-result.interface'
import { IRoleAccess } from './role-access.interface'
export default interface IGraphQL {
  users: IUser[]
  user: IUser
  updateUser: IUser
  deleteUser: IUser

  permission: IPermission
  permissions: IPermission[]
  deletedPermission: IPermission

  roleAccess: IRoleAccess
  roleAccessList: IRoleAccess[]
  deletedRoleAccess: IRoleAccess

  userRoles: IRoleAccess[]

  client: IClient
  clients: IClient[]
  updateClient: IClient
  deleteClient: IClient

  deleteFutureVisitsByTypeVisit: IGenericResult
  deleteAllVisitsByTypeVisit: IGenericResult
  deleteInProjectVisit: IGenericResult

  systemAlert: ISystemAlert
  systemAlerts: ISystemAlert[]
  systemAlertFind: ISystemAlert
  createSystemAlert: ISystemAlert
  updateSystemAlert: ISystemAlert
  deleteSystemAlert: ISystemAlert
  systemAlertsBySession: ISystemAlert[]

  image: IImage
  images: IImage[]
  imageFind: IImage
  createImage: IImage
  updateImage: IImage
  deleteImage: IImage

  authorizationCodeExists: Boolean
}
