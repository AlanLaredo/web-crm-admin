import gql from 'graphql-tag'

export default gql`
query applicantStatus($id: ID, $name: String, $description: String, $offset: Int, $limit: Int){
    applicantStatus(id: $id, name: $name, description: $description, offset: $offset, limit: $limit){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
        description
    }
}`
