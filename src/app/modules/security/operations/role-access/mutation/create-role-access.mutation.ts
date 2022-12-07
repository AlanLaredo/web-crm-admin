import gql from 'graphql-tag'
export const CREATE_ROLE_ACCESS = gql`
mutation createRoleAccess (
  $name: String!,
  $description: String!,
  $permissionIds: [ID!]
) {

  createRoleAccess (
    createRoleAccessData: {
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
