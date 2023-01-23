import gql from 'graphql-tag'

export default gql`query nominas($id: ID, $prenominaId: ID, $employeeId: ID, $keycode: String, $bankAccount: String, $clientId: ID, $clientServiceId: ID, $salary: Float, $absences: Float, $saving: Float, $uniforms: Float, $advance: Float, $double: Float, $bonus: Float, $holiday: Float, $infonavit: Float, $fonacot: Float, $loan: Float, $nss: Float, $total: Float, $operationsIds: [ID!], $offset: Int, $limit: Int){
    nominas(id: $id, prenominaId: $prenominaId, employeeId: $employeeId, keycode: $keycode, bankAccount: $bankAccount, clientId: $clientId, clientServiceId: $clientServiceId, salary: $salary, absences: $absences, saving: $saving, uniforms: $uniforms, advance: $advance, double: $double, bonus: $bonus, holiday: $holiday, infonavit: $infonavit, fonacot: $fonacot, loan: $loan, nss: $nss, total: $total, operationsIds: $operationsIds, offset: $offset, limit: $limit){
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
