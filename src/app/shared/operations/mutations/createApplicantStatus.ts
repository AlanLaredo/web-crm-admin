import gql from 'graphql-tag'

export default gql`mutation 
createApplicantStatus($createApplicantStatusData: CreateApplicantStatusInput!){
    createApplicantStatus(createApplicantStatusData: $createApplicantStatusData){
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
