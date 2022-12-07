import gql from 'graphql-tag'
export const UPDATE_IMAGE = gql`
mutation updateImage (
  $id: ID!
  $displayName: String,
  $externalId: String,
  $externalPath: String,
  $externalName: String
) {
  updateImage (updateImageData: {
    id: $id,
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
