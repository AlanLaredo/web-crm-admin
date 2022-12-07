import gql from 'graphql-tag'

export default gql`mutation deleteJobVacancyStatus($deleteIdData: DeleteIDInput!){
    deleteJobVacancyStatus(deleteIdData: $deleteIdData){
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
