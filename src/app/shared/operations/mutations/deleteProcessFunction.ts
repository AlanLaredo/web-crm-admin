import gql from 'graphql-tag'

export default gql`mutation deleteProcessFunction($deleteIdData: DeleteIDInput!){
    deleteProcessFunction(deleteIdData: $deleteIdData){
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
