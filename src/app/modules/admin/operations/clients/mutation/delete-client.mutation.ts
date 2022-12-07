import gql from 'graphql-tag'
export const DELETE_CLIENT = gql`
mutation deleteClient ($id: ID!) {
  deleteClient (deleteIdData:{ id: $id }) {
    id
  }
}
`
