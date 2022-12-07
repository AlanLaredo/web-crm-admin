import gql from 'graphql-tag'

export default gql`mutation createJobVacancyStatus($createJobVacancyStatusData: CreateJobVacancyStatusInput!){
    createJobVacancyStatus(createJobVacancyStatusData: $createJobVacancyStatusData){
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
