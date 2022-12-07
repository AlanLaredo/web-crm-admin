import gql from 'graphql-tag'

export default gql`
query getPositionFind($id: ID, $name: String, $clientId: ID, $salary: Float, $offset: Int, $limit: Int){
    getPositionFind(id: $id, name: $name, clientId: $clientId, salary: $salary, offset: $offset, limit: $limit){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
        clientId
        salary
    }
}`
