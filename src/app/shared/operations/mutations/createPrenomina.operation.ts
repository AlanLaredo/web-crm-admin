import gql from 'graphql-tag'

export default gql`mutation createPrenomina($createPrenominaData: CreatePrenominaInput!){
    createPrenomina(createPrenominaData: $createPrenominaData){
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
