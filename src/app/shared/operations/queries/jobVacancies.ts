import gql from 'graphql-tag'

export default gql`
query jobVacancies($id: ID, $positionId: ID, $clientServiceId: ID, $totalVacancies: Float, $requiredDocumentsPaths: [String!], $jobVacanciesStatus: Int, $offset: Int, $limit: Int){
    jobVacancies(id: $id, positionId: $positionId, clientServiceId: $clientServiceId, totalVacancies: $totalVacancies, requiredDocumentsPaths: $requiredDocumentsPaths, jobVacanciesStatus: $jobVacanciesStatus, offset: $offset, limit: $limit){
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
        clientService {
          id
          name
        }
        companyId
        position {
          name
        }
        recruits {
          id
        }
    }
}`
