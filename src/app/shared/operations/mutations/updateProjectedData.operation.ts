import gql from 'graphql-tag'

export default gql`mutation updateProjectedData($updateProjectedDataData: UpdateProjectedDataInput!){
    updateProjectedData(updateProjectedDataData: $updateProjectedDataData){
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
