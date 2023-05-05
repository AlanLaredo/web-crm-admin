import gql from 'graphql-tag'

export default gql`query productManagement($id: ID, $keycode: String, $name: String, $description: String, $reorderPoint: Float, $unitCost: Float, $itemsInStock: Float, $offset: Int, $limit: Int){
    productManagement(id: $id, keycode: $keycode, name: $name, description: $description, reorderPoint: $reorderPoint, unitCost: $unitCost, itemsInStock: $itemsInStock, offset: $offset, limit: $limit){
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
