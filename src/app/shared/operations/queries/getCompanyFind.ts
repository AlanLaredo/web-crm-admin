import gql from 'graphql-tag'

export default gql`
query getCompanyFind($id: ID, $name: ID, $companyGroupId: ID, $logoImagePath: String, $companyId: ID, $offset: Int, $limit: Int){
    getCompanyFind(id: $id, name: $name, companyGroupId: $companyGroupId, logoImagePath: $logoImagePath, companyId: $companyId, offset: $offset, limit: $limit){
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
}`
