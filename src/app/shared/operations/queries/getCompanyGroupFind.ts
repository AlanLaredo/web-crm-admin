import gql from 'graphql-tag'

export default gql`
query getCompanyGroupFind($id: ID, $name: String, $offset: Int, $limit: Int){
    getCompanyGroupFind(id: $id, name: $name, offset: $offset, limit: $limit){
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
