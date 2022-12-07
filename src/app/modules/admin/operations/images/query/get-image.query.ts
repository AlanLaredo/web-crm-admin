import gql from 'graphql-tag'
export const GET_IMAGE = gql`
query image ($id: ID!) {
  image (id: $id) {
    id
    displayName
    externalId
    externalPath
    externalName
    createdBy
    createdAt
    modifiedBy
    modifiedAt
  }
}`
