import gql from 'graphql-tag'
export const GET_SYSTEM_ALERTS_BY_SESSION = gql`
query systemAlertsBySession {
  systemAlertsBySession {
    id
    userId
    name
    description
    viewedAt
    attendedAt
    uniqKey
    createdAt
    systemAlertOverdueVisit {
      id
      date
      typeVisit
      price
      payment {
        id
        paymentDetails {
          id
          total
        }
      }
      project {
        id
        folio
        client {
          id
          name
          email
          managerName
          contactNumbers
          clientType {
            id
            name
          }
        }
      }
    }
    systemAlertVisitAuthorizationCode {
      id
      date
      typeVisit
      project {
        id
        folio
      }
    }
    systemAlertAfterHoursActivityUser {
      id
      username
      firstName
      lastName
    }

    systemAlertAuthorizationCode {
      id
      code
      user {
        username
        email
        firstName
        lastName
        roleName
      }
    }
    createdBy
    createdAt
    modifiedBy
    modifiedAt
  }
}
`
