import gql from 'graphql-tag'

export default gql`
query getRolePermissionFind($id: ID, $name: String, $description: String, $tag: String, $offset: Int, $limit: Int){
    getRolePermissionFind(id: $id, name: $name, description: $description, tag: $tag, offset: $offset, limit: $limit){
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
