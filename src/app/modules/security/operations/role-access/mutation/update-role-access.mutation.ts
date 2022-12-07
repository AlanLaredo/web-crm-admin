import gql from 'graphql-tag'
export const UPDATE_ROLE_ACCESS = gql`
mutation updateRoleAccess (
  $id: ID!,
  $name: String,
  $description: String,
  $permissionIds: [ID!]
) {

  updateRoleAccess (
    updateRoleAccessData: {
      id: $id,
      name: $name,
      description: $description,
      permissionIds: $permissionIds
    }
  ) {
    id
    name
    description
    permissionIds
  }

}
`
