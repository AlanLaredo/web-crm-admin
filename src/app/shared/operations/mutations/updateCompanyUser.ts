import gql from 'graphql-tag'

export default gql`mutation updateCompanyUser($updateCompanyUserData: UpdateCompanyUserInput!){
    updateCompanyUser(updateCompanyUserData: $updateCompanyUserData){
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
