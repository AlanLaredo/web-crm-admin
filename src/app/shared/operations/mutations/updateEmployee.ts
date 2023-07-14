import gql from 'graphql-tag'

export default gql`mutation updateEmployee($updateEmployeeData: UpdateEmployeeInput!){
    updateEmployee(updateEmployeeData: $updateEmployeeData){
      createdBy
      createdAt
      modifiedBy
      modifiedAt
      deletedBy
      deletedAt
      id
      keycode
      bankAccount
      companyId
      company {
        id
        name
      }
      client {
        businessName
      }
      attachedQuotePath
      person{
          name
          lastName
          phoneContacts
          emails
          comments
          address{
              name
              street
              exteriorNumber
              interiorNumber
              neightborhood
              city
              state
              country
              postalCode
          }
      }
      positionId
      position {
        name
      }
      hiringDate
      startOperationDate
      clientId
      clientServiceId
      address{
          name
          street
          exteriorNumber
          interiorNumber
          neightborhood
          city
          state
          country
          postalCode
      }
      operations {
        date
        employeeId
        operation
        operationConfirm
        restDay
        workshift
        hours
        operationModifiedBy
        operationConfirmModifiedBy
      }
  }
}`
