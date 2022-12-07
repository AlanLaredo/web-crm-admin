import gql from 'graphql-tag'

export default gql`mutation deleteMetaConfiguration($deleteIdData: DeleteIDInput!){
    deleteMetaConfiguration(deleteIdData: $deleteIdData){
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        deletedBy
        deletedAt
        id
        key
        value
        description
        active
    }
}
`
