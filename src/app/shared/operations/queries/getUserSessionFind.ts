import gql from 'graphql-tag'

export default gql`
query getUserSessionFind($id: ID, $userId: ID, $changePassword: Boolean, $platformKey: String, $token: String, $offset: Int, $limit: Int){
    getUserSessionFind(id: $id, userId: $userId, changePassword: $changePassword, platformKey: $platformKey, token: $token, offset: $offset, limit: $limit){
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
}`
