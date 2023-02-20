import gql from 'graphql-tag'

export default gql`mutation deleteProjectedData($deleteIdData: DeleteIDInput!){
    deleteProjectedData(deleteIdData: $deleteIdData){
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
