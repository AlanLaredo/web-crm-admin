import gql from 'graphql-tag'

export default gql`mutation deleteUserSession($deleteIdData: DeleteIDInput!){
    deleteUserSession(deleteIdData: $deleteIdData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        userId
        changePassword
        platformKey
        token
    }
}
`
