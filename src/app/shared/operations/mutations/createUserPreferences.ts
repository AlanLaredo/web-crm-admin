import gql from 'graphql-tag'

export default gql`mutation createUserPreferences($createUserPreferencesData: CreateUserPreferencesInput!){
    createUserPreferences(createUserPreferencesData: $createUserPreferencesData){
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
