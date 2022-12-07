import gql from 'graphql-tag'

export default gql`
query metaConfiguration($id: ID, $key: String, $value: String, $description: String, $active: Boolean, $offset: Int, $limit: Int){
    metaConfiguration(id: $id, key: $key, value: $value, description: $description, active: $active, offset: $offset, limit: $limit){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        key
        value
        description
        active
    }
}`
