import gql from 'graphql-tag'

export default gql`mutation createProjectedPeriod($createProjectedPeriodData: CreateProjectedPeriodInput!){
    createProjectedPeriod(createProjectedPeriodData: $createProjectedPeriodData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        date
        companyId
    }
}`
