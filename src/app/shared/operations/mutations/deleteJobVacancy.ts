import gql from 'graphql-tag'

export default gql`mutation deleteJobVacancy($deleteIdData: DeleteIDInput!){
    deleteJobVacancy(deleteIdData: $deleteIdData){
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
        jobVacanciesStatus
    }
}
`
