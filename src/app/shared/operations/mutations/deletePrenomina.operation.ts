import gql from 'graphql-tag'

export default gql`mutation deletePrenomina($deleteIdData: DeleteIDInput!){
    deletePrenomina(deleteIdData: $deleteIdData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
        clientIds
        billing
    }
}`
