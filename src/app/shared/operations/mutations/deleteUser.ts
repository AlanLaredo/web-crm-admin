import gql from 'graphql-tag'

export default gql`mutation deleteUser($deleteIdData: DeleteIDInput!){
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
