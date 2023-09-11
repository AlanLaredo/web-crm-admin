import gql from 'graphql-tag'

export default gql`mutation updateOperation($updateOperationData: UpdateOperationInput!){
    updateOperation(updateOperationData: $updateOperationData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        date
        employeeId
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
