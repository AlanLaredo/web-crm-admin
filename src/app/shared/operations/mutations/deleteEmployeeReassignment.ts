import gql from 'graphql-tag'

export default gql`mutation deleteEmployeeReassignment($deleteIdData: DeleteIDInput!){
    deleteEmployeeReassignment(deleteIdData: $deleteIdData){
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
