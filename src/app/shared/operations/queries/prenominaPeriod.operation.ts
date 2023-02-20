import gql from 'graphql-tag'

export default gql`query prenominaPeriod($id: ID, $name: String, $date: DateTime, $prenominaConfigurationId: ID, $completed: Boolean, $totalVacancies: [CreatePrenomionaPeriodVacanciesConfigurationInput!], $prenominaPeriodEmployees: [PrenominaPeriodEmployeeInput!], $offset: Int, $limit: Int){
  prenominaPeriod(id: $id, name: $name, date: $date, prenominaConfigurationId: $prenominaConfigurationId, completed: $completed, totalVacancies: $totalVacancies, prenominaPeriodEmployees: $prenominaPeriodEmployees, offset: $offset, limit: $limit){
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
        employee {
          id
          person {
            name
          }
        }
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
