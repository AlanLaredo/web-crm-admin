/* eslint-disable no-useless-constructor */
/* eslint-disable no-self-assign */
import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ApolloQueryResult } from 'apollo-client'

import { GraphqlService } from 'src/app/shared/services'
import { IGraphQL } from 'src/app/shared/interfaces'
import { ISystemAlert } from '../models/data'
import { ADMIN_OPERATIONS } from '../operations'

@Injectable({
  providedIn: 'root'
})
export class SystemAlertService extends GraphqlService {
  constructor (
    apollo: Apollo
  ) {
    super(apollo)
  }

  getById (id: string): Observable<ISystemAlert> {
    return this.query(ADMIN_OPERATIONS.GET_SYSTEM_ALERT, { id })
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.systemAlert
      }))
  }

  list (): Observable<ISystemAlert[]> {
    return this.query(ADMIN_OPERATIONS.GET_SYSTEM_ALERTS)
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.systemAlerts
      }))
  }

  listBySession (): Observable<ISystemAlert[]> {
    return this.query(ADMIN_OPERATIONS.GET_SYSTEM_ALERTS_BY_SESSION)
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.systemAlertsBySession
      }))
  }

  create (data: ISystemAlert): Observable<ISystemAlert> {
    return this.mutate(ADMIN_OPERATIONS.CREATE_SYSTEM_ALERT, data)
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.systemAlert
      }))
  }

  update (data: Partial<ISystemAlert>): Observable<ISystemAlert> {
    return this.mutate(ADMIN_OPERATIONS.UPDATE_SYSTEM_ALERT, data)
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.updateSystemAlert
      }))
  }

  remove (id: string) {
    return this.mutate(ADMIN_OPERATIONS.DELETE_SYSTEM_ALERT, { id })
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.deleteSystemAlert
      }))
  }
}
