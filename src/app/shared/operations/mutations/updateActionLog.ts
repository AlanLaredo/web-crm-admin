import gql from 'graphql-tag'

export default gql`mutation updateActionLog($updateActionLogData: UpdateActionLogInput!){
    updateActionLog(updateActionLogData: $updateActionLogData){
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
