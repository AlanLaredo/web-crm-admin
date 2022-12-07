import gql from 'graphql-tag'

export default gql`mutation createCompany($createCompanyData: CreateCompanyInput!){
    createCompany(createCompanyData: $createCompanyData){
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
