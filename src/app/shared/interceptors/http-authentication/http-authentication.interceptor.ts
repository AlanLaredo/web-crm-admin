/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
// Third party
import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'

// Own Services
import { LoginService } from '../../../modules/auth/services'

// Constants
import { SKIP_TOKEN_HEADER } from '../constants'

import { environment } from 'src/environments/environment'

@Injectable()
export class HttpAuthenticationInterceptor implements HttpInterceptor {
  constructor (
    private loginService: LoginService
  ) {
  }

  intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = request.headers
    if (headers.has(SKIP_TOKEN_HEADER)) {
      headers.delete(SKIP_TOKEN_HEADER)
      return next.handle(request)
    } else {
      if (request.url.indexOf('./') === 0 || !request.url.startsWith(environment.graphql_api_url)) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.loginService.getAccessToken()}`
          }
        })
        return next.handle(request)
      } else if (this.loginService.getAccessToken()) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.loginService.getAccessToken()}`
          }
        })
        return next.handle(request)
      } else {
        return throwError(new Error('Sin sesión activa'))
      }
    }
  }
}
