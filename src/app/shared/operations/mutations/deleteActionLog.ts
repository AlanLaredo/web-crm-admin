import gql from 'graphql-tag'

export default gql`mutation deleteActionLog($deleteIdData: DeleteIDInput!){
    deleteActionLog(deleteIdData: $deleteIdData){
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
