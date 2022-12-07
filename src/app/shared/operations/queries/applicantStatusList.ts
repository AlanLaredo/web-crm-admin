import gql from 'graphql-tag'

export default gql`
query applicantStatusList($id: ID, $name: String, $description: String, $offset: Int, $limit: Int){
    applicantStatusList(id: $id, name: $name, description: $description, offset: $offset, limit: $limit){
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
