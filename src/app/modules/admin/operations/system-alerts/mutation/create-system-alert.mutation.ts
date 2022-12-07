import gql from 'graphql-tag'
export const CREATE_SYSTEM_ALERT = gql`
mutation createSystemAlert (
  $userId: String!
  $name: String!,
  $description: String,
  $viewedAt: DateTime,
  $attendedAt: DateTime,
  $uniqKey: string
  ) {
  createSystemAlert (createSystemAlertData: {
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
  }
}
`
