import gql from 'graphql-tag'
export const DELETE_PERMISSION = gql`
mutation deletePermission (
  $id: ID!
  ) {
  deletePermission (deletePermissionData: {
    id: $id
  }) {
    id
  }
}
`
