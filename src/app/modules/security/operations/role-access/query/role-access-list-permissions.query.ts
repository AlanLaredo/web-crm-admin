import gql from 'graphql-tag'
export const GET_ROLE_ACCESS_LIST_PERMISSIONS = gql`
query {
  roleAccessList {
    id
    name
    description
    permissionIds
    permissions {
      id
      name
    }
  }
}
`
