import gql from 'graphql-tag'

export default gql`mutation updateCompanyGroup($updateCompanyGroupData: UpdateCompanyGroupInput!){
    updateCompanyGroup(updateCompanyGroupData: $updateCompanyGroupData){
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
