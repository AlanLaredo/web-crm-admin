import gql from 'graphql-tag'

export default gql`mutation updateUserRole($updateUserRoleData: UpdateUserRoleInput!){
    updateUserRole(updateUserRoleData: $updateUserRoleData){
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
        companyId
    }
}
`
