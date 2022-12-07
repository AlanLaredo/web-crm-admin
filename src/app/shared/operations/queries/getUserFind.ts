import gql from 'graphql-tag'

export default gql`
query getUserFind($id: ID, $username: String, $email: String, $firstName: String, $lastName: String, $roleAccessId: ID, $password: String, $offset: Int, $limit: Int){
    getUserFind(id: $id, username: $username, email: $email, firstName: $firstName, lastName: $lastName, roleAccessId: $roleAccessId, password: $password, offset: $offset, limit: $limit){
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
