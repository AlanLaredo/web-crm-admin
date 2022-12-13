import gql from 'graphql-tag'

export default gql`
query company($id: ID, $name: String, $companyGroupId: ID, $logoImagePath: String, $companyId: ID, $offset: Int, $limit: Int){
    company(id: $id, name: $name, companyGroupId: $companyGroupId, logoImagePath: $logoImagePath, companyId: $companyId, offset: $offset, limit: $limit){
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
