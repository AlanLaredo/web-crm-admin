import gql from 'graphql-tag'

export default gql`
query getUserRoleFind($id: ID, $name: String, $description: String, $permissionsIds: [ID!], $offset: Int, $limit: Int){
    getUserRoleFind(id: $id, name: $name, description: $description, permissionsIds: $permissionsIds, offset: $offset, limit: $limit){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
        description
        permissionsIds
    }
}`
