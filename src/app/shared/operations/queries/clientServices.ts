import gql from 'graphql-tag'

export default gql`
query clientServices($id: ID, $name: String, $clientId: ID, $serviceType: String, $scheduleHours: String, $serviceCost: Float, $elementCost: Float, $patrolCost: Float, $quadBikeCost: Float, $bossShiftCost: Float, $qrCost: Float, $costHolyDays: Float, $addressExecution: String, $totalElementsDay: Int, $totalElementsNight: Int, $totalPatrol: Int, $totalQuadBike: Int, $startDate: DateTime, $emergencyContact: CreatePersonInput, $paymentContact: CreatePersonInput, $creditDays: String, $paymentDays: String, $folioCounterReceipt: String, $billing: String, $branchBank: String, $lastFourDigits: String, $paymentMethod: String, $usageCfdi: String, $paymentForm: String, $offset: Int, $limit: Int){
    clientServices(id: $id, name: $name, clientId: $clientId, serviceType: $serviceType, scheduleHours: $scheduleHours, serviceCost: $serviceCost, elementCost: $elementCost, patrolCost: $patrolCost, quadBikeCost: $quadBikeCost, bossShiftCost: $bossShiftCost, qrCost: $qrCost, costHolyDays: $costHolyDays, addressExecution: $addressExecution, totalElementsDay: $totalElementsDay, totalElementsNight: $totalElementsNight, totalPatrol: $totalPatrol, totalQuadBike: $totalQuadBike, startDate: $startDate, emergencyContact: $emergencyContact, paymentContact: $paymentContact, creditDays: $creditDays, paymentDays: $paymentDays, folioCounterReceipt: $folioCounterReceipt, billing: $billing, branchBank: $branchBank, lastFourDigits: $lastFourDigits, paymentMethod: $paymentMethod, usageCfdi: $usageCfdi, paymentForm: $paymentForm, offset: $offset, limit: $limit){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        clientId
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
        name
        emergencyContact{
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
        paymentContact{
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
        creditDays
        paymentDays
        folioCounterReceipt
        billing
        branchBank
        lastFourDigits
        paymentMethod
        usageCfdi
        paymentForm
    }
}
`
