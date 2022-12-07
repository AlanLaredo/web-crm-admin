import gql from 'graphql-tag'

export default gql`mutation createRolePermission($createRolePermissionData: CreateRolePermissionInput!){
    createRolePermission(createRolePermissionData: $createRolePermissionData){
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
