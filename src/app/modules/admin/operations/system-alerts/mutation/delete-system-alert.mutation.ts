import gql from 'graphql-tag'
export const DELETE_SYSTEM_ALERT = gql`
mutation deleteSystemAlert ($id: ID!) {
  deleteSystemAlert (deleteIdData:{ id: $id }) {
    id
  }
}
`
