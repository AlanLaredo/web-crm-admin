import gql from 'graphql-tag'

export default gql`mutation deleteCompanyUser($deleteIdData: DeleteIDInput!){
    deleteCompanyUser(deleteIdData: $deleteIdData){
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
