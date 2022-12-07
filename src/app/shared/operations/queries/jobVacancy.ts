import gql from 'graphql-tag'

export default gql`
query jobVacancy($id: ID, $name: String, $clientId: ID, $totalVacancies: Float, $requiredDocumentsPaths: [String!], $jobVacanciesStatusId: ID, $offset: Int, $limit: Int){
    jobVacancy(id: $id, name: $name, clientId: $clientId, totalVacancies: $totalVacancies, requiredDocumentsPaths: $requiredDocumentsPaths, jobVacanciesStatusId: $jobVacanciesStatusId, offset: $offset, limit: $limit){
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
}`
