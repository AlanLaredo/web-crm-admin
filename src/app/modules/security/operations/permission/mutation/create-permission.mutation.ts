import gql from 'graphql-tag'
export const CREATE_PERMISSION = gql`
mutation createPermission (
  $name: String!,
  $description: String!,
  $tag: String!) {
    createPermission (createPermissionData: {
      name: $name,
      description: $description,
      tag: $tag
  }) {
    id
    name
    description
    tag
  }
}
`
