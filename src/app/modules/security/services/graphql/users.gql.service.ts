/* eslint-disable no-useless-constructor */
/* eslint-disable no-self-assign */
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Apollo } from 'apollo-angular'
import { ApolloQueryResult } from 'apollo-client'

import { OPERATIONS } from '../../operations'
import { IGraphQL } from '../../../../shared/interfaces'
import { IUser } from 'src/app/shared/interfaces/user.interface'
import { GraphqlService } from 'src/app/shared/services'

import { user } from 'src/app/shared/operations/queries'
import { createUser, updateUser } from 'src/app/shared/operations/mutations'

@Injectable({
  providedIn: 'root'
})
export class UsersGqlService extends GraphqlService {
  constructor (
    apollo: Apollo
  ) {
    super(apollo)
  }

  public getOne (id: string) {
    return this.execute(user, { id })
    // const definitions: any = updateUser.definitions[0]
    // return this.query(user, { id })
    //   .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
    //     return result.data.user
    //   }))
  }

  list (): Observable<IUser[]> {
    return this.query(OPERATIONS.GET_USERS)
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.users
      }))
  }

  create (data: IUser) {
    return this.execute(createUser, data)

    // return this.mutate(OPERATIONS.CREATE_USER, { createUserData: data })
    //   .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
    //     return result.data.user
    //   }))
  }

  update (data: IUser) {
    return this.execute(updateUser, data)

    // return this.mutate(OPERATIONS.UPDATE_USER, { updateUserData: UpdateUserInput })
    //   .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
    //     return result.data.updateUser
    //   }))
  }

  remove (id: string) {
    return this.mutate(OPERATIONS.DELETE_USER, { deleteIdData: { id } })
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.deleteUser
      }))
  }
}
