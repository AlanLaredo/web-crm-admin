import gql from 'graphql-tag'

export default gql`mutation updatePosition($updatePositionData: UpdatePositionInput!){
    updatePosition(updatePositionData: $updatePositionData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        requiredDocumentsPaths
        id
        name
        clientId
        salary
    }
}
`
