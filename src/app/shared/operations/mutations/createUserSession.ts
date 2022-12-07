import gql from 'graphql-tag'

export default gql`mutation createUserSession($createUserSessionData: CreateUserSessionInput!){
    createUserSession(createUserSessionData: $createUserSessionData){
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
