import gql from 'graphql-tag'

export default gql`mutation createProjectedData($createProjectedDataData: CreateProjectedDataInput!){
    createProjectedData(createProjectedDataData: $createProjectedDataData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        clientName
        clientKeycode
        startDate
        clientServiceId
        serviceCost
        description
        invoiceName
        invoiceTotal
        invoiceTypePayment
    }
}`
