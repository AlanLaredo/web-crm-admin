import gql from 'graphql-tag'

export default gql`
query getCustomerFind($id: ID, $processId: ID, $commercialValue: Float, $attemptClosingDate: DateTime, $clientId: ID, $customerName: String, $catalogPriority: Float, $attachedQuotePath: [String!], $comments: String, $contact: CreatePersonInput, $offset: Int, $limit: Int){
    getCustomerFind(id: $id, processId: $processId, commercialValue: $commercialValue, attemptClosingDate: $attemptClosingDate, clientId: $clientId, customerName: $customerName, catalogPriority: $catalogPriority, attachedQuotePath: $attachedQuotePath, comments: $comments, contact: $contact, offset: $offset, limit: $limit){
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
}`
