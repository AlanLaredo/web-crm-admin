import gql from 'graphql-tag'

export default gql`mutation updateProcess($updateProcessData: UpdateProcessInput!){
    updateProcess(updateProcessData: $updateProcessData){
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
