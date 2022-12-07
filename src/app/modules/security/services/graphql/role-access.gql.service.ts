/* eslint-disable no-useless-constructor */
/* eslint-disable no-self-assign */
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Apollo } from 'apollo-angular'
import { ApolloQueryResult } from 'apollo-client'

import { OPERATIONS } from '../../operations'
import { IGraphQL } from '../../../../shared/interfaces'
import { IRoleAccess } from 'src/app/shared/interfaces/role-access.interface'
import { GraphqlService } from 'src/app/shared/services'

@Injectable({
  providedIn: 'root'
})
export class RoleAcccessGqlService extends GraphqlService {
  constructor (
    apollo: Apollo
  ) {
    super(apollo)
  }

  public getOne (id: string): Observable<IRoleAccess> {
    return this.query(OPERATIONS.GET_ROLE_ACCESS, { id })
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.roleAccess
      }))
  }

  list (): Observable<IRoleAccess[]> {
    return this.query(OPERATIONS.GET_ROLE_ACCESS_LIST)
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.userRoles
      }))
  }

  create (data: IRoleAccess): Observable<IRoleAccess> {
    return this.mutate(OPERATIONS.CREATE_ROLE_ACCESS, data)
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.roleAccess
      }))
  }

  update (visitingPoint: IRoleAccess): Observable<IRoleAccess> {
    return this.mutate(OPERATIONS.UPDATE_ROLE_ACCESS, visitingPoint)
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.roleAccess
      }))
  }

  remove (id: string) {
    return this.mutate(OPERATIONS.DELETE_ROLE_ACCESS, { id })
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.roleAccess
      }))
  }
}
