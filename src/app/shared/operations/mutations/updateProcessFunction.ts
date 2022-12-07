import gql from 'graphql-tag'

export default gql`mutation updateProcessFunction($updateProcessFunctionData: UpdateProcessFunctionInput!){
    updateProcessFunction(updateProcessFunctionData: $updateProcessFunctionData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
        description
        key
    }
}
`
