import gql from 'graphql-tag'

export default gql`mutation deleteUserPreferences($deleteIdData: DeleteIDInput!){
    deleteUserPreferences(deleteIdData: $deleteIdData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        userId
        theme
        menuMode
    }
}
`
