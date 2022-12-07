import gql from 'graphql-tag'

export default gql`mutation updateUserPreferences($updateUserPreferencesData: UpdateUserPreferencesInput!){
    updateUserPreferences(updateUserPreferencesData: $updateUserPreferencesData){
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
