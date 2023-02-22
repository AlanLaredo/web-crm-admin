
import gql from 'graphql-tag'

export default gql`query projectedPeriod($id: ID, $date: DateTime, $companyId: ID, $offset: Int, $limit: Int){
    projectedPeriod(id: $id, date: $date, companyId: $companyId, offset: $offset, limit: $limit){
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
