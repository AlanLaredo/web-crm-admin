/* eslint-disable no-useless-constructor */
/* eslint-disable no-self-assign */
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Apollo } from 'apollo-angular'
import { ApolloQueryResult } from 'apollo-client'

import { OPERATIONS } from '../../operations'
import { IGraphQL } from '../../../../shared/interfaces'
import { IPermission } from 'src/app/shared/interfaces'
import { GraphqlService } from 'src/app/shared/services'

@Injectable({
  providedIn: 'root'
})
export class PermissionsGqlService extends GraphqlService {
  constructor (
    apollo: Apollo
  ) {
    super(apollo)
  }

  public getOne (id: string): Observable<IPermission> {
    return this.query(OPERATIONS.GET_PERMISSION, { id })
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.permission
      }))
  }

  list (): Observable<IPermission[]> {
    return this.query(OPERATIONS.GET_PERMISSIONS)
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.permissions
      }))
  }

  create (data: IPermission): Observable<IPermission> {
    return this.mutate(OPERATIONS.CREATE_PERMISSION, data)
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.permission
      }))
  }

  update (data: IPermission): Observable<IPermission> {
    return this.mutate(OPERATIONS.UPDATE_PERMISSION, data)
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.permission
      }))
  }

  remove (id: string) {
    return this.mutate(OPERATIONS.DELETE_PERMISSION, { id })
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.deletedPermission
      }))
  }
}
