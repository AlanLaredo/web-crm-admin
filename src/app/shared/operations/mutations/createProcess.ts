import gql from 'graphql-tag'

export default gql`mutation createProcess($createProcessData: CreateProcessInput!){
    createProcess(createProcessData: $createProcessData){
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
