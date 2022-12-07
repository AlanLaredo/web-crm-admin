import gql from 'graphql-tag'

export default gql`mutation deleteUserRole($deleteIdData: DeleteIDInput!){
    deleteUserRole(deleteIdData: $deleteIdData){
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
