import gql from 'graphql-tag'

export default gql`
query employeeReassignments($id: ID, $employeId: ID, $transmitterClientId: ID, $receiverClientId: ID, $reason: String, $offset: Int, $limit: Int){
    employeeReassignments(id: $id, employeId: $employeId, transmitterClientId: $transmitterClientId, receiverClientId: $receiverClientId, reason: $reason, offset: $offset, limit: $limit){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        employeId
        transmitterClientId
        receiverClientId
        reason
        company {
          name
        }
        employee {
          person{
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
        transmitterClient {
          businessName
          businessReason
        }
        receiverClient {
          businessName
          businessReason
        }
    }
}`
