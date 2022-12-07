import gql from 'graphql-tag'
export const UPDATE_CLIENT = gql`
mutation updateClient (
  $id: ID!,
  $name: String,
  $email: String,
  $clientTypeId: ID,
  $managerName: String,
  $legalRepresentative: String,
  $contactNumbers: [String!],
  $postalCode: String,
  $republicState: String,
  $municipality: String,
  $suburb: String,
  $street: String,
  $locationReferences: String,
  $socialReason: String,
  $fiscalAddress: String,
  $usageCfdi: String,
  $rfc: String,
  $fiscalEmail: String
) {
  updateClient (updateClientData: {
    id: $id,
    name: $name,
    email: $email,
    clientTypeId: $clientTypeId,
    managerName: $managerName,
    legalRepresentative: $legalRepresentative,
    contactNumbers: $contactNumbers,
    postalCode: $postalCode,
    republicState: $republicState,
    municipality: $municipality,
    suburb: $suburb,
    street: $street,
    locationReferences: $locationReferences,
    socialReason: $socialReason,
    fiscalAddress: $fiscalAddress,
    usageCfdi: $usageCfdi,
    rfc: $rfc,
    fiscalEmail: $fiscalEmail
  }) {
    id
  }
}
`
