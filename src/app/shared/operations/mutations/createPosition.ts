import gql from 'graphql-tag'

export default gql`mutation createPosition($createPositionData: CreatePositionInput!){
    createPosition(createPositionData: $createPositionData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
        clientId
        salary
    }
}
`
