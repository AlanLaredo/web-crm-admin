import gql from 'graphql-tag'

export default gql`mutation deletePrenominaPeriodEmployeeDay($deleteIdData: DeleteIDInput!){
    deletePrenominaPeriodEmployeeDay(deleteIdData: $deleteIdData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        prenominaPeriodEmployeeId
        date
        operationText
        operationAbbreviation
    }
}`
