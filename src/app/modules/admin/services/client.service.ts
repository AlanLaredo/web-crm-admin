/* eslint-disable no-useless-constructor */
/* eslint-disable no-self-assign */
import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ApolloQueryResult } from 'apollo-client'

import { GraphqlService } from 'src/app/shared/services'
import { IGraphQL } from 'src/app/shared/interfaces'
import IClient from '../models/data/client.interface'
import { ADMIN_OPERATIONS } from '../operations'

@Injectable({
  providedIn: 'root'
})
export class ClientService extends GraphqlService {
  constructor (
    apollo: Apollo
  ) {
    super(apollo)
  }

  getById (id: string): Observable<IClient> {
    return this.query(ADMIN_OPERATIONS.GET_CLIENT, { id })
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.client
      }))
  }

  list (): Observable<IClient[]> {
    return this.query(ADMIN_OPERATIONS.GET_CLIENTS)
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.clients
      }))
  }

  create (data: IClient): Observable<IClient> {
    return this.mutate(ADMIN_OPERATIONS.CREATE_CLIENT, data)
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.client
      }))
  }

  update (data: Partial<IClient>): Observable<IClient> {
    return this.mutate(ADMIN_OPERATIONS.UPDATE_CLIENT, data)
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.updateClient
      }))
  }

  remove (id: string) {
    return this.mutate(ADMIN_OPERATIONS.DELETE_CLIENT, { id })
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.client
      }))
  }
}
