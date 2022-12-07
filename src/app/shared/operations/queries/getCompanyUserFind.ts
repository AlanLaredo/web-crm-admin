import gql from 'graphql-tag'

export default gql`
query getCompanyUserFind($id: ID, $companyId: ID, $userId: ID, $offset: Int, $limit: Int){
    getCompanyUserFind(id: $id, companyId: $companyId, userId: $userId, offset: $offset, limit: $limit){
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
}`
