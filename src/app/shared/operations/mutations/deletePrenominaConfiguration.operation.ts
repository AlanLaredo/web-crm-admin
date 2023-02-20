import gql from 'graphql-tag'

export default gql`mutation deletePrenominaConfiguration($deleteIdData: DeleteIDInput!){
    deletePrenominaConfiguration(deleteIdData: $deleteIdData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
        clientsIds
        billingPeriod 
    }
}`
