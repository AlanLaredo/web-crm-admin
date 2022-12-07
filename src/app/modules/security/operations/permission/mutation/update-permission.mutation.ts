import gql from 'graphql-tag'
export const UPDATE_PERMISSION = gql`
mutation updatePermission (
  $id: ID!,
  $name: String!,
  $description: String!,
  $tag: String!) {
    updatePermission (updatePermissionData: {
      id: $id,
      name: $name,
      description: $description,
      tag: $tag
  }) {
    id
    name
    description
    tag
  }
}`
