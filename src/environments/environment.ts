// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  // rest_api_url: 'http://128.199.41.36:3000',
  // graphql_api_url: 'http://128.199.41.36:3000/admin',
  rest_api_url: 'http://localhost:3001',
  graphql_api_url: 'http://localhost:3001/admin',
  aws_s3_api: 'https://web-crm-admin.s3.eu-central-1.amazonaws.com/',
  authTokenKey: 'Production',
  version: '1.0.0',
  aws_file_service: {
    access_key_id: 'AKIA5UTPAFHAT72YVYVZ',
    secret_access_key: 'vRfvPupBi6RJh9kraJYEwebYvvmnytXhaKHNDbFQ',
    region: 'us-east-1',
    bucket: 'jbweb-crm-admin'
  }
}

// // This file can be replaced during build by using the `fileReplacements` array.
// // `ng build` replaces `environment.ts` with `environment.prod.ts`.
// // The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: true,
//   // rest_api_url: 'http://128.199.41.36:3000',
//   // graphql_api_url: 'http://128.199.41.36:3000/admin',
//   rest_api_url: 'http://localhost:3001',
//   graphql_api_url: 'http://localhost:3001/admin',
//   aws_s3_api: 'https://crm.s3.us-east-1.amazonaws.com/',
//   authTokenKey: 'Production',
//   version: '1.0.0',
//   aws_file_service: {
//     access_key_id: 'AKIAZTHYD2V6E5G74EIP',
//     secret_access_key: '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',
//     region: 'us-east-1',
//     bucket: 'nwfbucket'
//   }
// }
