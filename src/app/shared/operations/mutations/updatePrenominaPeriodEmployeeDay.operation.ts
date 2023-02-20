import gql from 'graphql-tag'

export default gql`mutation updatePrenominaPeriodEmployeeDay($updatePrenominaPeriodEmployeeDayData: UpdatePrenominaPeriodEmployeeDayInput!){
    updatePrenominaPeriodEmployeeDay(updatePrenominaPeriodEmployeeDayData: $updatePrenominaPeriodEmployeeDayData){
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
