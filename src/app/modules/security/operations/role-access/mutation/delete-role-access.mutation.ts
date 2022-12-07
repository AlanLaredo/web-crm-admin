import gql from 'graphql-tag'
export const DELETE_ROLE_ACCESS = gql`
mutation deleteRoleAccess (
  $id: ID!
) {
  deleteRoleAccess (
    deleteRoleAccessData: {
      id: $id
    }
  ) {
    id
  }
}
`
