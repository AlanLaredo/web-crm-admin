import gql from 'graphql-tag'

export default gql`mutation deletePosition($deleteIdData: DeleteIDInput!){
    deletePosition(deleteIdData: $deleteIdData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
        clientId
        salary
    }
}
`
