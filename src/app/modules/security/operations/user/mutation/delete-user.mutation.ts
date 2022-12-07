import gql from 'graphql-tag'
export const DELETE_USER = gql`
mutation deleteUser($deleteIdData: DeleteIDInput!){
  deleteUser(deleteIdData: $deleteIdData){
      createdBy
      createdAt
      modifiedBy
      modifiedAt
      deletedBy
      deletedAt
      id
      username
      email
      firstName
      lastName
      roleAccessId
  }
}
`
