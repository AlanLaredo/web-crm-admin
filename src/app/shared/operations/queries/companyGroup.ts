import gql from 'graphql-tag'

export default gql`
query companyGroup($id: ID, $name: String, $offset: Int, $limit: Int){
    companyGroup(id: $id, name: $name, offset: $offset, limit: $limit){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
    }
}`
