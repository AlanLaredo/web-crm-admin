import gql from 'graphql-tag'
export const GET_PERMISSION = gql`
query permission ($id: ID!) {
  permission (id: $id) {
    id
    name
    description
    tag
  }
}
`
