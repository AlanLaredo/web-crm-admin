import gql from 'graphql-tag'

export default gql`mutation updatePrenomina($updatePrenominaData: UpdatePrenominaInput!){
    updatePrenomina(updatePrenominaData: $updatePrenominaData){
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
