import gql from 'graphql-tag'

export default gql`mutation deleteApplicantStatus($deleteIdData: DeleteIDInput!){
    deleteApplicantStatus(deleteIdData: $deleteIdData){
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
