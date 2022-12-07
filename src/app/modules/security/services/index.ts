import { PermissionsGqlService, UsersGqlService, RoleAcccessGqlService } from './graphql'

export const SECURITY_SERVICES = [
  UsersGqlService,
  PermissionsGqlService,
  RoleAcccessGqlService
]
export {
  UsersGqlService,
  PermissionsGqlService,
  RoleAcccessGqlService
}
