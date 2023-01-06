import gql from 'graphql-tag'

export default gql`
query position($id: ID, $name: String, $clientId: ID, $salary: Float, $offset: Int, $limit: Int){
    position(id: $id, name: $name, clientId: $clientId, salary: $salary, offset: $offset, limit: $limit){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        requiredDocumentsPaths
        id
        name
        clientId
        salary
    }
}`
