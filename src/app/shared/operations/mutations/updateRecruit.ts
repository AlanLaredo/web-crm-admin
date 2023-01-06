import gql from 'graphql-tag'

export default gql`mutation updateRecruit($updateRecruitData: UpdateRecruitInput!){
    updateRecruit(updateRecruitData: $updateRecruitData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        data{
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
        jobVacancyId
        interviewerName
        requiredDocumentsPaths
        requiredInfo
        statusApplicant
    }
}
`
