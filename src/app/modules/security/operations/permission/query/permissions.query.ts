import gql from 'graphql-tag'
export const GET_PERMISSIONS = gql`
query {
  permissions  {
    id
    name
    description
    tag
  }
}
`
