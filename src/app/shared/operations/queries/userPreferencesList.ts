import gql from 'graphql-tag'

export default gql`
query userPreferencesList($id: ID, $userId: ID, $theme: String, $menuMode: String, $offset: Int, $limit: Int){
    userPreferencesList(id: $id, userId: $userId, theme: $theme, menuMode: $menuMode, offset: $offset, limit: $limit){
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
}`
