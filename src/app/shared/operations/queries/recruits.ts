import gql from 'graphql-tag'

export default gql`
query recruits($id: ID, $data: CreatePersonInput, $jobVacancyId: ID, $interviewerName: String, $requiredDocumentsPaths: [String!], $requiredInfo: String, $statusApplicant: Int, $offset: Int, $limit: Int){
    recruits(id: $id, data: $data, jobVacancyId: $jobVacancyId, interviewerName: $interviewerName, requiredDocumentsPaths: $requiredDocumentsPaths, requiredInfo: $requiredInfo, statusApplicant: $statusApplicant, offset: $offset, limit: $limit){
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
}`
