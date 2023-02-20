import gql from 'graphql-tag'

export default gql`query prenominaPeriodEmployeeDay($id: ID, $prenominaPeriodEmployeeId: ID, $date: DateTime, $operationText: String, $operationAbbreviation: String, $offset: Int, $limit: Int){
    prenominaPeriodEmployeeDay(id: $id, prenominaPeriodEmployeeId: $prenominaPeriodEmployeeId, date: $date, operationText: $operationText, operationAbbreviation: $operationAbbreviation, offset: $offset, limit: $limit){
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
