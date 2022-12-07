import gql from 'graphql-tag'

export default gql`mutation updateEmployeeReassignment($updateEmployeeReassignmentData: UpdateEmployeeReassignmentInput!){
    updateEmployeeReassignment(updateEmployeeReassignmentData: $updateEmployeeReassignmentData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        employeId
        transmitterClientId
        receiverClientId
        reason
    }
}
`
