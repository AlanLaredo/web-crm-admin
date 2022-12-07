import gql from 'graphql-tag'

export default gql`mutation updateApplicantStatus($updateApplicantStatusData: UpdateApplicantStatusInput!){
    updateApplicantStatus(updateApplicantStatusData: $updateApplicantStatusData){
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
