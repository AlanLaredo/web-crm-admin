/* eslint-disable no-useless-constructor */
/* eslint-disable no-self-assign */
import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ApolloQueryResult } from 'apollo-client'

import { GraphqlService } from 'src/app/shared/services'
import { IGraphQL } from 'src/app/shared/interfaces'
import { IImage } from '../models/data'
import { ADMIN_OPERATIONS } from '../operations'

@Injectable({
  providedIn: 'root'
})
export class ImageService extends GraphqlService {
  constructor (
    apollo: Apollo
  ) {
    super(apollo)
  }

  getById (id: string): Observable<IImage> {
    return this.query(ADMIN_OPERATIONS.GET_IMAGE, { id })
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.image
      }))
  }

  list (): Observable<IImage[]> {
    return this.query(ADMIN_OPERATIONS.GET_IMAGES)
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.images
      }))
  }

  create (data: IImage): Observable<IImage> {
    return this.mutate(ADMIN_OPERATIONS.CREATE_IMAGE, data)
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.createImage
      }))
  }

  update (data: Partial<IImage>): Observable<IImage> {
    return this.mutate(ADMIN_OPERATIONS.UPDATE_IMAGE, data)
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.updateImage
      }))
  }

  remove (id: string) {
    return this.mutate(ADMIN_OPERATIONS.DELETE_IMAGE, { id })
      .pipe(map((result: ApolloQueryResult<IGraphQL>) => {
        return result.data.deleteImage
      }))
  }
}
