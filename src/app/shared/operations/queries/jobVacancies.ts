import gql from 'graphql-tag'

export default gql`
query jobVacancies($id: ID, $name: String, $clientId: ID, $totalVacancies: Float, $requiredDocumentsPaths: [String!], $jobVacanciesStatusId: ID, $offset: Int, $limit: Int){
    jobVacancies(id: $id, name: $name, clientId: $clientId, totalVacancies: $totalVacancies, requiredDocumentsPaths: $requiredDocumentsPaths, jobVacanciesStatusId: $jobVacanciesStatusId, offset: $offset, limit: $limit){
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
