import gql from 'graphql-tag'

export default gql`
query operations($id: ID, $date: DateTime, $operation: String, $operationConfirm: String, $restDay: String, $workshift: String, $hours: String, $operationComments: String, $operationConfirmComments: String, $operationModifiedBy: ID, $operationConfirmModifiedBy: ID, $offset: Int, $limit: Int){
  operations(id: $id, date: $date, operation: $operation, operationConfirm: $operationConfirm, restDay: $restDay, workshift: $workshift, hours: $hours, operationComments: $operationComments, operationConfirmComments: $operationConfirmComments, operationModifiedBy: $operationModifiedBy, operationConfirmModifiedBy: $operationConfirmModifiedBy, offset: $offset, limit: $limit){
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
  }
}`
