import gql from 'graphql-tag'

export default gql`mutation deleteProjectedPeriod($deleteIdData: DeleteIDInput!){
    deleteProjectedPeriod(deleteIdData: $deleteIdData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        date
        companyId
    }
}`
