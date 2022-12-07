import gql from 'graphql-tag'
export const DELETE_IMAGE = gql`
mutation deleteImage ($id: ID!) {
  deleteImage (deleteIdData:{ id: $id }) {
    id
  }
}
`
