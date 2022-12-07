import gql from 'graphql-tag'

export default gql`mutation deleteCompanyGroup($deleteIdData: DeleteIDInput!){
    deleteCompanyGroup(deleteIdData: $deleteIdData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
    }
}
`
