import gql from 'graphql-tag'
export const GET_USERS = gql`
query users($id: ID, $username: String, $email: String, $firstName: String, $lastName: String, $roleAccessId: ID, $password: String, $offset: Int, $limit: Int){
  users(id: $id, username: $username, email: $email, firstName: $firstName, lastName: $lastName, roleAccessId: $roleAccessId, password: $password, offset: $offset, limit: $limit){
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
