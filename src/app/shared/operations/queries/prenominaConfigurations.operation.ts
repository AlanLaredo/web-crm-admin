import gql from 'graphql-tag'

export default gql`query prenominaConfigurations($id: ID, $name: String, $clientsIds: [ID!], $billingPeriod: String, $prenominaPeriods: [PrenominaPeriodInput!], $offset: Int, $limit: Int){
    prenominaConfigurations(id: $id, name: $name, clientsIds: $clientsIds, billingPeriod: $billingPeriod, prenominaPeriods: $prenominaPeriods, offset: $offset, limit: $limit){
        id
        name
        billingPeriod
        clientsIds
        clients {
          id
          businessName
          clientServices {
            id
            totalElementsDay
            totalElementsNight
            name
            billing
            employees {
              id
              keycode
              companyId
              attachedQuotePath
              bankAccount
              client {
                businessName
              }
              person{
                  name
                  lastName
                  phoneContacts
                  emails
                  comments
                  address {
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
                id
                name
                clientId
                salary
              }
              hiringDate
              startOperationDate
              clientId
              clientServiceId
            }
          }
        }
    }
}`
