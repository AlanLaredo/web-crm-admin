import gql from 'graphql-tag'

export default gql`
query jobVacancy($id: ID, $positionId: ID, $clientServiceId: ID, $totalVacancies: Float, $requiredDocumentsPaths: [String!], $jobVacanciesStatus: Int, $offset: Int, $limit: Int){
    jobVacancy(id: $id, positionId: $positionId, clientServiceId: $clientServiceId, totalVacancies: $totalVacancies, requiredDocumentsPaths: $requiredDocumentsPaths, jobVacanciesStatus: $jobVacanciesStatus, offset: $offset, limit: $limit){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        positionId
        companyId
        clientServiceId
        totalVacancies
        requiredDocumentsPaths
        jobVacanciesStatus
        clientService {
          id
          name
          clientId
        }
        position {
          id
          name
          requiredDocumentsPaths
        }
    }
}`
