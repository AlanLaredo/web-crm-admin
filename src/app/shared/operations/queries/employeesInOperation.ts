import gql from 'graphql-tag'

export default gql`
query employeesInOperation($id: ID, $keycode: String, $person: CreatePersonInput, $positionId: ID, $hiringDate: DateTime, $startOperationDate: DateTime, $clientId: ID, $address: CreateAddressInput, $offset: Int, $limit: Int){
  employeesInOperation(id: $id, keycode: $keycode, person: $person, positionId: $positionId, hiringDate: $hiringDate, startOperationDate: $startOperationDate, clientId: $clientId, address: $address, offset: $offset, limit: $limit){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        keycode
        companyId
        company {
          id
          name
        }
        client {
          businessName
        }
        clientService {
          name
        }
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
        positionId
        position {
          name
        }
        hiringDate
        startOperationDate
        clientId
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
        operations {
          id
          employeeId
          date
          operation
          operationConfirm
          restDay
          workshift
          hours
          operationModifiedBy
          operationConfirmModifiedBy
          operationComments
          operationConfirmComments
          operationHours
          operationConfirmHours
        }
    }
}`
