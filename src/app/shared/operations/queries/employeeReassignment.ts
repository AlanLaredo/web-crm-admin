import gql from 'graphql-tag'

export default gql`
query employeeReassignment($id: ID, $employeId: ID, $transmitterClientId: ID, $receiverClientId: ID, $reason: String, $offset: Int, $limit: Int){
    employeeReassignment(id: $id, employeId: $employeId, transmitterClientId: $transmitterClientId, receiverClientId: $receiverClientId, reason: $reason, offset: $offset, limit: $limit){
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
}`
