import gql from 'graphql-tag'

export default gql`
query user($id: ID, $username: String, $email: String, $firstName: String, $lastName: String, $roleAccessId: ID, $companyId: ID, $password: String, $offset: Int, $limit: Int){
    user(id: $id, username: $username, email: $email, firstName: $firstName, lastName: $lastName, roleAccessId: $roleAccessId, companyId: $companyId, password: $password, offset: $offset, limit: $limit){
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
        companyId
    }
}`
