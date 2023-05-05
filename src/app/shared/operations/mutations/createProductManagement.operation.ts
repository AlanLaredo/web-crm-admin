import gql from 'graphql-tag'

export default gql`mutation createProductManagement($createProductManagementData: CreateProductManagementInput!){
    createProductManagement(createProductManagementData: $createProductManagementData){
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
