import gql from 'graphql-tag'

export default gql`mutation updateCustomer($updateCustomerData: UpdateCustomerInput!){
    updateCustomer(updateCustomerData: $updateCustomerData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        processId
        commercialValue
        attemptClosingDate
        clientId
        customerName
        catalogPriority
        attachedQuotePath
        comments
        emails
        contact{
            name
            lastName
            phoneContacts
            emails
            comments
            address{
                name
                street
                exteriorNumber
                interiorNumber
                neightborhood
                city
                state
                country
                postalCode
            }
        }
    }
}
`
