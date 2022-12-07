import gql from 'graphql-tag'

export default gql`mutation createClient($createClientData: CreateClientInput!){
    createClient(createClientData: $createClientData){
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
