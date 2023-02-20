import gql from 'graphql-tag'

export default gql`mutation createPrenominaConfiguration($createPrenominaConfigurationData: CreatePrenominaConfigurationInput!){
    createPrenominaConfiguration(createPrenominaConfigurationData: $createPrenominaConfigurationData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        name
        clientsIds
        billingPeriod
        prenominaPeriods{
            createdBy
            createdAt
            modifiedBy
            modifiedAt
            deletedBy
            deletedAt
            id
            name
            prenominaConfigurationId
            completed
            prenominaPeriodEmployees{
                createdBy
                createdAt
                modifiedBy
                modifiedAt
                deletedBy
                deletedAt
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
                employee{
                    createdBy
                    createdAt
                    modifiedBy
                    modifiedAt
                    deletedBy
                    deletedAt
                    id
                    keycode
                    bankAccount
                    person{
                        name
                        lastName
                        phoneContacts
                        emails
                        comments
                    }
                    positionId
                    hiringDate
                    startOperationDate
                    clientId
                    clientServiceId
                    companyId
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
                    attachedQuotePath
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
                    company{
                        createdBy
                        createdAt
                        modifiedBy
                        modifiedAt
                        deletedBy
                        deletedAt
                        id
                        name
                        companyGroupId
                        logoImagePath
                        companyId
                    }
                    client{
                        createdBy
                        createdAt
                        modifiedBy
                        modifiedAt
                        deletedBy
                        deletedAt
                        id
                        keycode
                        rfc
                        businessName
                        businessReason
                        companyId
                    }
                    clientService{
                        createdBy
                        createdAt
                        modifiedBy
                        modifiedAt
                        deletedBy
                        deletedAt
                        id
                        keycode
                        clientId
                        name
                        serviceType
                        scheduleHours
                        serviceCost
                        elementCost
                        patrolCost
                        quadBikeCost
                        bossShiftCost
                        qrCost
                        costHolyDays
                        addressExecution
                        totalElementsDay
                        totalElementsNight
                        totalPatrol
                        totalQuadBike
                        startDate
                        creditDays
                        paymentDays
                        folioCounterReceipt
                        billing
                        branchBank
                        lastFourDigits
                        paymentMethod
                        usageCfdi
                        paymentForm
                        description
                    }
                    position{
                        createdBy
                        createdAt
                        modifiedBy
                        modifiedAt
                        deletedBy
                        deletedAt
                        id
                        name
                        clientId
                        salary
                        requiredDocumentsPaths
                    }
                }
                prenominaPeriodEmployeeDays{
                    createdBy
                    createdAt
                    modifiedBy
                    modifiedAt
                    deletedBy
                    deletedAt
                    id
                    prenominaPeriodEmployeeId
                    date
                    operationText
                    operationAbbreviation
                }
            }
        }
    }
}`
