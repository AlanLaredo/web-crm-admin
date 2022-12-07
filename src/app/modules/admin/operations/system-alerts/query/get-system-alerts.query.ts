import gql from 'graphql-tag'
export const GET_SYSTEM_ALERTS = gql`
query systemAlerts {
  systemAlerts {
    id
    userId
    name
    description
    viewedAt
    attendedAt
    uniqKey
    createdBy
    createdAt
    modifiedBy
    modifiedAt
  }
}
`
