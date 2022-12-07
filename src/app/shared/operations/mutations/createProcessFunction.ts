import gql from 'graphql-tag'

export default gql`mutation createProcessFunction($createProcessFunctionData: CreateProcessFunctionInput!){
    createProcessFunction(createProcessFunctionData: $createProcessFunctionData){
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
