import gql from 'graphql-tag'

export default gql`
query operationSendEmail($message: String!){
  operationSendEmail(message: $message)
}`
