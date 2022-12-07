/* eslint-disable no-useless-constructor */
import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { ApolloQueryResult } from 'apollo-client'
import { DocumentNode } from 'graphql'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'

import { IGraphQL } from '../../../shared/interfaces'

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor (private apollo: Apollo) { }

  protected query<T> (query: DocumentNode, variables: Partial<T> = {}, context: object = {}): Observable<ApolloQueryResult<IGraphQL>> {
    return this.apollo.watchQuery<IGraphQL>({
      query,
      variables,
      context,
      fetchPolicy: 'network-only',
      errorPolicy: 'all'
    }).valueChanges
  }

  protected mutate<T> (mutation: DocumentNode, variables: Partial<T> = {}, context: object = {}): Observable<any> {
    return this.apollo.mutate<IGraphQL>({
      mutation,
      variables,
      context,
      errorPolicy: 'all'
    })
  }

  execute (operation: DocumentNode, variables: any): Promise<any> {
    const definitions: any = operation.definitions[0]
    const resultOperation: string = definitions.name.value
    let prepareOperation
    if (definitions.operation === 'query') {
      prepareOperation = this.query(operation, variables)
    } else {
      const prepareValues: any = {}
      const customKey = definitions.variableDefinitions[0].variable.name.value
      prepareValues[customKey] = variables
      prepareOperation = this.mutate(operation, prepareValues)
    }

    return prepareOperation.pipe(
      map((result: any) => result.data[resultOperation]),
      take(1)
    ).toPromise()
  }
}
