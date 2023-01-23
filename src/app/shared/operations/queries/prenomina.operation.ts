import gql from 'graphql-tag'

export default gql`query prenomina($id: ID, $name: String, $clientIds: [ID!], $billing: String, $offset: Int, $limit: Int){
    prenomina(id: $id, name: $name, clientIds: $clientIds, billing: $billing, offset: $offset, limit: $limit){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
        clientIds
        billing
    }
}`
