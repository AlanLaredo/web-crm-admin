import gql from 'graphql-tag'
export const CREATE_USER = gql`
mutation createUser($createUserData: CreateUserInput!){
  createUser(createUserData: $createUserData){
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
