import gql from 'graphql-tag'

export default gql`mutation createActionLog($createActionLogData: CreateActionLogInput!){
    createActionLog(createActionLogData: $createActionLogData){
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
