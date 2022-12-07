import gql from 'graphql-tag'

export default gql`mutation createMetaConfiguration($createMetaConfigurationData: CreateMetaConfigurationInput!){
    createMetaConfiguration(createMetaConfigurationData: $createMetaConfigurationData){
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
