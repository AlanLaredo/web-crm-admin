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
        name
        clientId
        totalVacancies
        requiredDocumentsPaths
        jobVacanciesStatusId
    }
}
`
