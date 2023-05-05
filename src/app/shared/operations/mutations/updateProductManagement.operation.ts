import gql from 'graphql-tag'

export default gql`mutation updateProductManagement($updateProductManagementData: UpdateProductManagementInput!){
    updateProductManagement(updateProductManagementData: $updateProductManagementData){
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
