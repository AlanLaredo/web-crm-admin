import gql from 'graphql-tag'

export default gql`mutation deleteProcess($deleteIdData: DeleteIDInput!){
    deleteProcess(deleteIdData: $deleteIdData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
        order
        functionsIds
        companyId
    }
}
`
