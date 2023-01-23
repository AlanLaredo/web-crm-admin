import gql from 'graphql-tag'

export default gql`mutation createNomina($createNominaData: CreateNominaInput!){
    createNomina(createNominaData: $createNominaData){
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
