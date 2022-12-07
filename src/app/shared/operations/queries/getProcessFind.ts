import gql from 'graphql-tag'

export default gql`
query getProcessFind($id: ID, $name: String, $order: Float, $functionsIds: [ID!], $companyId: ID, $offset: Int, $limit: Int){
    getProcessFind(id: $id, name: $name, order: $order, functionsIds: $functionsIds, companyId: $companyId, offset: $offset, limit: $limit){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
        order
        functionsIds
        companyId
    }
}`
