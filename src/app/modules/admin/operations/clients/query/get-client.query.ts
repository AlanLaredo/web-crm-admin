import gql from 'graphql-tag'
export const GET_CLIENT = gql`
query client ($id: ID!) {
  client (id: $id) {
    id
    name
    email
    clientTypeId
    managerName
    legalRepresentative
    contactNumbers
    postalCode
    republicState
    municipality
    suburb
    street
    locationReferences
    socialReason
    fiscalAddress
    usageCfdi
    rfc
    fiscalEmail
    createdBy
    createdAt
    modifiedBy
    modifiedAt
  }
}
`
