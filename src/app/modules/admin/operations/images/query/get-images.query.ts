import gql from 'graphql-tag'
export const GET_IMAGES = gql`
query images {
  images {
    id
    displayName
    externalId
    externalPath
    externalName
    createdAt
    createdBy
    modifiedBy
    modifiedAt
  }
}
`
