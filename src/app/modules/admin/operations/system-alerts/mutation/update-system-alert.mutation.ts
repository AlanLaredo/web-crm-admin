import gql from 'graphql-tag'
export const UPDATE_SYSTEM_ALERT = gql`
mutation updateSystemAlert (
  $id: ID!,
  $userId: ID,
  $name: String,
  $description: String,
  $viewedAt: DateTime,
  $attendedAt: DateTime,
  $uniqKey: String
) {
  updateSystemAlert (updateSystemAlertData: {
    id: $id,
    userId: $userId,
    name: $name,
    description: $description,
    viewedAt: $viewedAt,
    attendedAt: $attendedAt,
    uniqKey: $uniqKey
  }) {
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
    systemAlertAfterHoursActivityUser {
      id
      username
      firstName
      lastName
    }
  }
}
`
