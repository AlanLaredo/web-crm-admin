import gql from 'graphql-tag'
export const GET_SYSTEM_ALERT = gql`
query systemAlert ($id: ID!) {
  systemAlert (id: $id) {
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
