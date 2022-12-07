import gql from 'graphql-tag'
export const GET_ROLE_ACCESS_LIST = gql`
query userRoles($id: ID, $name: String, $description: String, $permissionsIds: [ID!], $offset: Int, $limit: Int){
  userRoles(id: $id, name: $name, description: $description, permissionsIds: $permissionsIds, offset: $offset, limit: $limit){
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
}
`
