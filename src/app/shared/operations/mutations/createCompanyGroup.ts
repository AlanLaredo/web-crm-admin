import gql from 'graphql-tag'

export default gql`mutation createCompanyGroup($createCompanyGroupData: CreateCompanyGroupInput!){
    createCompanyGroup(createCompanyGroupData: $createCompanyGroupData){
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
