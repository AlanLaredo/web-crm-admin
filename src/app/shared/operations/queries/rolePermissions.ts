import gql from 'graphql-tag'

export default gql`
query rolePermissions($id: ID, $name: String, $description: String, $tag: String, $offset: Int, $limit: Int){
    rolePermissions(id: $id, name: $name, description: $description, tag: $tag, offset: $offset, limit: $limit){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
        description
        tag
    }
}`
