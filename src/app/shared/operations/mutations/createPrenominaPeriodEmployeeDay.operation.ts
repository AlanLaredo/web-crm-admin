import gql from 'graphql-tag'

export default gql`mutation createPrenominaPeriodEmployeeDay($createPrenominaPeriodEmployeeDayData: CreatePrenominaPeriodEmployeeDayInput!){
    createPrenominaPeriodEmployeeDay(createPrenominaPeriodEmployeeDayData: $createPrenominaPeriodEmployeeDayData){
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
