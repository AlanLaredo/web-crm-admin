import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http'
import { catchError, retry } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import Swal from 'sweetalert2'
import { TranslateService } from '@ngx-translate/core'
import { Injectable } from '@angular/core'

@Injectable()
export class HttpErrorExceptionIntercept implements HttpInterceptor {
  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService) {}

  intercept (
    request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          const returnError = {
            ...error
          }
          switch (error.status) {
            case 0:
              Swal.fire({ icon: 'warning', titleText: this.translate.instant('messages.serviceNotAvailable') }).then()
              break
            case 500:
              Swal.fire({ icon: 'warning', titleText: this.translate.instant('messages.internalServer') }).then()
              break
          }
          return throwError(returnError)
        })
      )
  }
}
