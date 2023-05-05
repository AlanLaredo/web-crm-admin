import gql from 'graphql-tag'

export default gql`mutation deleteProductManagement($deleteIdData: DeleteIDInput!){
    deleteProductManagement(deleteIdData: $deleteIdData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        keycode
        name
        description
        reorderPoint
        unitCost
        itemsInStock
    }
}`
