import gql from 'graphql-tag'

export default gql`mutation deletePrenominaPeriod($deleteIdData: DeleteIDInput!){
    deletePrenominaPeriod(deleteIdData: $deleteIdData){
      id
    }
}`
