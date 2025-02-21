import { GET_USER, GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from './user'
import { GET_ROLE_ACCESS_LIST_PERMISSIONS, GET_ROLE_ACCESS_LIST, GET_ROLE_ACCESS, CREATE_ROLE_ACCESS, UPDATE_ROLE_ACCESS, DELETE_ROLE_ACCESS } from './role-access'
import { CREATE_PERMISSION, UPDATE_PERMISSION, DELETE_PERMISSION, GET_PERMISSION, GET_PERMISSIONS } from './permission'

export const OPERATIONS = {
  GET_USER,
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,

  GET_ROLE_ACCESS,
  GET_ROLE_ACCESS_LIST_PERMISSIONS,
  GET_ROLE_ACCESS_LIST,
  CREATE_ROLE_ACCESS,
  UPDATE_ROLE_ACCESS,
  DELETE_ROLE_ACCESS,

  CREATE_PERMISSION,
  UPDATE_PERMISSION,
  DELETE_PERMISSION,
  GET_PERMISSION,
  GET_PERMISSIONS
}
