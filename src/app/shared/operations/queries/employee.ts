import gql from 'graphql-tag'

export default gql`
query employee($id: ID, $keycode: String, $person: CreatePersonInput, $positionId: ID, $hiringDate: DateTime, $startOperationDate: DateTime, $clientId: ID, $address: CreateAddressInput, $offset: Int, $limit: Int){
    employee(id: $id, keycode: $keycode, person: $person, positionId: $positionId, hiringDate: $hiringDate, startOperationDate: $startOperationDate, clientId: $clientId, address: $address, offset: $offset, limit: $limit){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        keycode
        companyId
        attachedQuotePath
        bankAccount
        company {
          name
        }
        client {
          businessName
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
        hiringDate
        startOperationDate
        clientId
        clientServiceId
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
}`
