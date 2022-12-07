import gql from 'graphql-tag'

export default gql`mutation updateUserSession($updateUserSessionData: UpdateUserSessionInput!){
    updateUserSession(updateUserSessionData: $updateUserSessionData){
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
