import gql from 'graphql-tag'
export const UPDATE_USER = gql`
mutation updateUser($updateUserData: UpdateUserInput!){
  updateUser(updateUserData: $updateUserData){
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
}`
