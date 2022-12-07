import gql from 'graphql-tag'

export default gql`mutation updateMetaConfiguration($updateMetaConfigurationData: UpdateMetaConfigurationInput!){
    updateMetaConfiguration(updateMetaConfigurationData: $updateMetaConfigurationData){
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
