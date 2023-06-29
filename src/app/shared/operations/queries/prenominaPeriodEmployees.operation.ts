import gql from 'graphql-tag'

export default gql`query prenominaPeriodEmployees($id: ID, $employeeId: ID, $prenominaPeriodId: ID, $keycode: String, $bankAccount: String, $clientName: String, $salary: Float, $absences: Float, $saving: Float, $uniforms: Float, $advance: Float, $double: Float, $bonus: Float, $holiday: Float, $infonavit: Float, $fonacot: Float, $loan: Float, $nss: Float, $total: Float, $employee: EmployeeInput, $prenominaPeriodEmployeeDays: [PrenominaPeriodEmployeeDayInput!], $offset: Int, $limit: Int){
  prenominaPeriodEmployees(id: $id, employeeId: $employeeId, prenominaPeriodId: $prenominaPeriodId, keycode: $keycode, bankAccount: $bankAccount, clientName: $clientName, salary: $salary, absences: $absences, saving: $saving, uniforms: $uniforms, advance: $advance, double: $double, bonus: $bonus, holiday: $holiday, infonavit: $infonavit, fonacot: $fonacot, loan: $loan, nss: $nss, total: $total, employee: $employee, prenominaPeriodEmployeeDays: $prenominaPeriodEmployeeDays, offset: $offset, limit: $limit){
    id
    employeeId
    prenominaPeriodId
    keycode
    bankAccount
    clientName
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
    loanDeposit
    differenceWithoutImss
    total
    employee {
      id
      keycode
      bankAccount
      positionId
      hiringDate
      startOperationDate
      clientId
      clientServiceId
      companyId
      attachedQuotePath
      person {
        name
        lastName
      }
      clientService {
        name
      }
    }
    prenominaPeriodEmployeeDays {
      id
      prenominaPeriodEmployeeId
      date
      operationText
      operationAbbreviation
      operationComments
      operationConfirmComments
    }
  }
}`
