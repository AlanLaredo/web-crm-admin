import gql from 'graphql-tag'

export default gql`mutation createPrenominaPeriod($createPrenominaPeriodData: CreatePrenominaPeriodInput!){
    createPrenominaPeriod(createPrenominaPeriodData: $createPrenominaPeriodData){
      id
      name
      date
      prenominaConfigurationId
      completed
      totalVacancies{
        clientName
        clientServiceName
        totalVacancies
      }
      prenominaPeriodEmployees{
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
      }
      operations{
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
  }
}`
