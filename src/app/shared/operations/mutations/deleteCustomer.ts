import gql from 'graphql-tag'

export default gql`mutation deleteCustomer($deleteIdData: DeleteIDInput!){
    deleteCustomer(deleteIdData: $deleteIdData){
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
