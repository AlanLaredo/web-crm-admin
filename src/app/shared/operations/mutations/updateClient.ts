import gql from 'graphql-tag'

export default gql`mutation updateClient($updateClientData: UpdateClientInput!){
    updateClient(updateClientData: $updateClientData){
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
}
`
