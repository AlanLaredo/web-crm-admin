import gql from 'graphql-tag'

export default gql`mutation deleteCompany($deleteIdData: DeleteIDInput!){
    deleteCompany(deleteIdData: $deleteIdData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
        companyGroupId
        logoImagePath
        companyId
    }
}
`
