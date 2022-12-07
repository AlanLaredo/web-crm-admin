import gql from 'graphql-tag'

export default gql`mutation updateCompany($updateCompanyData: UpdateCompanyInput!){
    updateCompany(updateCompanyData: $updateCompanyData){
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
