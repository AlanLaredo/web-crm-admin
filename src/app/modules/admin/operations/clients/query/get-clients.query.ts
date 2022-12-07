import gql from 'graphql-tag'
export const GET_CLIENTS = gql`
query clients {
  clients {
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
