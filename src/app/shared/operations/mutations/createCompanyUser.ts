import gql from 'graphql-tag'

export default gql`mutation createCompanyUser($createCompanyUserData: CreateCompanyUserInput!){
    createCompanyUser(createCompanyUserData: $createCompanyUserData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        companyId
        userId
    }
}
`
