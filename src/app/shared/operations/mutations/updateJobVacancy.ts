import gql from 'graphql-tag'

export default gql`mutation updateJobVacancy($updateJobVacancyData: UpdateJobVacancyInput!){
    updateJobVacancy(updateJobVacancyData: $updateJobVacancyData){
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
