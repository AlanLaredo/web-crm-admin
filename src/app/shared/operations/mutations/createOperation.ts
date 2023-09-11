
import gql from 'graphql-tag'

export default gql`mutation createOperation($createOperationData: CreateOperationInput!){
    createOperation(createOperationData: $createOperationData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        employeeId
        date
        operation
        operationConfirm
        restDay
        workshift
        hours
        operationComments
        operationConfirmComments
        operationModifiedBy
        operationConfirmModifiedBy
        operationHours
        operationConfirmHours
    }
}
`
