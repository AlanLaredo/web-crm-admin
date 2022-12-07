import gql from 'graphql-tag'

export default gql`
query client($id: ID, $keycode: String, $rfc: String, $businessName: String, $businessReason: String, $legalRepresentativeContact: CreatePersonInput, $fiscalAddress: CreateAddressInput, $companyId: ID, $offset: Int, $limit: Int){
    client(id: $id, keycode: $keycode, rfc: $rfc, businessName: $businessName, businessReason: $businessReason, legalRepresentativeContact: $legalRepresentativeContact, fiscalAddress: $fiscalAddress, companyId: $companyId, offset: $offset, limit: $limit){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        keycode
        rfc
        businessName
        businessReason
        legalRepresentativeContact{
            name
            lastName
            phoneContacts
            emails
            comments
            address{
                name
                street
                exteriorNumber
                interiorNumber
                neightborhood
                city
                state
                country
                postalCode
            }
        }
        fiscalAddress{
            name
            street
            exteriorNumber
            interiorNumber
            neightborhood
            city
            state
            country
            postalCode
        }
        companyId
    }
}`
