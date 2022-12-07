import gql from 'graphql-tag'

export default gql`mutation updateRolePermission($updateRolePermissionData: UpdateRolePermissionInput!){
    updateRolePermission(updateRolePermissionData: $updateRolePermissionData){
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
}
`
