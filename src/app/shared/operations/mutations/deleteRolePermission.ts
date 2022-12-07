import gql from 'graphql-tag'

export default gql`mutation deleteRolePermission($deleteIdData: DeleteIDInput!){
    deleteRolePermission(deleteIdData: $deleteIdData){
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
