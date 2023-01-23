import gql from 'graphql-tag'

export default gql`mutation deleteNomina($deleteIdData: DeleteIDInput!){
    deleteNomina(deleteIdData: $deleteIdData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        prenominaId
        employeeId
        keycode
        bankAccount
        clientId
        clientServiceId
        salary
        absences
        saving
        uniforms
        advance
        double
        bonus
        holiday
        infonavit
        fonacot
        loan
        nss
        total
        operationsIds
    }
}`
