import { Injector } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { LOCATION_INITIALIZED } from '@angular/common'
import { TranslateService } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

export function HttpLoaderFactory (httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json')
}

export function ApplicationInitializerFactory (translate: TranslateService, injector: Injector) {
  return async () => {
    await injector.get(LOCATION_INITIALIZED, Promise.resolve(null))
    translate.setDefaultLang('es')
    return translate.use('es').toPromise()
  }
}
