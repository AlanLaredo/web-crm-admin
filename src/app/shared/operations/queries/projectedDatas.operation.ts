import gql from 'graphql-tag'

export default gql`query projectedDatas($id: ID, $clientName: String, $clientKeycode: String, $startDate: DateTime, $clientServiceId: ID, $serviceCost: Float, $description: String, $invoiceName: String, $invoiceTotal: Float, $invoiceTypePayment: String, $offset: Int, $limit: Int){
    projectedDatas(id: $id, clientName: $clientName, clientKeycode: $clientKeycode, startDate: $startDate, clientServiceId: $clientServiceId, serviceCost: $serviceCost, description: $description, invoiceName: $invoiceName, invoiceTotal: $invoiceTotal, invoiceTypePayment: $invoiceTypePayment, offset: $offset, limit: $limit){
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
