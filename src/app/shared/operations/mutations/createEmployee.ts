import gql from 'graphql-tag'

export default gql`mutation createEmployee($createEmployeeData: CreateEmployeeInput!){
    createEmployee(createEmployeeData: $createEmployeeData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        keycode
        person{
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
        positionId
        hiringDate
        startOperationDate
        clientId
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
}
`
