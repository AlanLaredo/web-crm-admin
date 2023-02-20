import gql from 'graphql-tag'

export default gql`mutation updatePrenominaConfiguration($updatePrenominaConfigurationData: UpdatePrenominaConfigurationInput!){
    updatePrenominaConfiguration(updatePrenominaConfigurationData: $updatePrenominaConfigurationData){
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
