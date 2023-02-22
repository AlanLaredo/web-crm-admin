
import gql from 'graphql-tag'

export default gql`query projectedPeriods($id: ID, $date: DateTime, $companyId: ID, $offset: Int, $limit: Int){
    projectedPeriods(id: $id, date: $date, companyId: $companyId, offset: $offset, limit: $limit){
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
