import gql from 'graphql-tag'

export default gql`
query actionLog($id: ID, $userId: ID, $file: String, $action: String, $description: String, $offset: Int, $limit: Int){
    actionLog(id: $id, userId: $userId, file: $file, action: $action, description: $description, offset: $offset, limit: $limit){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        userId
        file
        action
        description
    }
}
`
