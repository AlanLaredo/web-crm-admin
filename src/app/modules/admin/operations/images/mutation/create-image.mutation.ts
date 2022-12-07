import gql from 'graphql-tag'
export const CREATE_IMAGE = gql`
mutation createImage (
  $displayName: String!,
  $externalId: String,
  $externalPath: String,
  $externalName: String
) {
  createImage (createImageData: {
    displayName: $displayName,
    externalId: $externalId,
    externalPath: $externalPath,
    externalName: $externalName
  }) {
    id
    displayName
    externalId
    externalPath
    externalName
  }
}
`
