import gql from 'graphql-tag'

export default gql`
query processFunction($id: ID, $name: String, $description: String, $key: String, $offset: Int, $limit: Int){
    processFunction(id: $id, name: $name, description: $description, key: $key, offset: $offset, limit: $limit){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
        description
        key
    }
}`
