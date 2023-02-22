import gql from 'graphql-tag'

export default gql`mutation updateProjectedData($updateProjectedDataData: UpdateProjectedDataInput!){
    updateProjectedData(updateProjectedDataData: $updateProjectedDataData){
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
