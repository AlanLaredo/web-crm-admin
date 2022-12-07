import gql from 'graphql-tag'

export default gql`mutation updateJobVacancyStatus($updateJobVacancyStatusData: UpdateJobVacancyStatusInput!){
    updateJobVacancyStatus(updateJobVacancyStatusData: $updateJobVacancyStatusData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
        description
    }
}
`
