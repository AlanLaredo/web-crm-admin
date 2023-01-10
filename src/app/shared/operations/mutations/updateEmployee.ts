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
      companyId
      company {
        id
        name
      }
      client {
        businessName
      }
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
