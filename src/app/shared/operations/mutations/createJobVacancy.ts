import gql from 'graphql-tag'

export default gql`mutation createJobVacancy($createJobVacancyData: CreateJobVacancyInput!){
    createJobVacancy(createJobVacancyData: $createJobVacancyData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        positionId
        clientServiceId
        totalVacancies
        requiredDocumentsPaths
        jobVacanciesStatus
    }
}
`
