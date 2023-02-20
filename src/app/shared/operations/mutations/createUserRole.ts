import gql from 'graphql-tag'

export default gql`mutation createUserRole($createUserRoleData: CreateUserRoleInput!){
    createUserRole(createUserRoleData: $createUserRoleData){
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
