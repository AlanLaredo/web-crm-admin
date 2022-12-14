import gql from 'graphql-tag'

export default gql`
query positions($id: ID, $name: String, $clientId: ID, $salary: Float, $offset: Int, $limit: Int){
    positions(id: $id, name: $name, clientId: $clientId, salary: $salary, offset: $offset, limit: $limit){
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
        client {
          businessName
          company {
            name
          }
        }
    }
}`
