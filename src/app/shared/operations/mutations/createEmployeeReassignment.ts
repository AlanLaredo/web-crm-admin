import gql from 'graphql-tag'

export default gql`mutation createEmployeeReassignment($createEmployeeReassignmentData: CreateEmployeeReassignmentInput!){
    createEmployeeReassignment(createEmployeeReassignmentData: $createEmployeeReassignmentData){
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
