// Third Party
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ApolloModule, Apollo } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { MatSidenavModule } from '@angular/material/sidenav'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'

// for material module
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatListModule } from '@angular/material/list'

// Environment
import { environment } from '../environments/environment'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

// Translate
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core'
import { ApplicationInitializerFactory, HttpLoaderFactory } from './translation/translation.config'

// graphql configuration
import { LoginService } from './modules/auth/services'
import { SharedModule } from './shared/shared.module'

import { NotifyService } from './shared/services'
import { MenuComponent } from './shared/components/menu'
import { MenuItemComponent } from './shared/components/menu-item'
import { SubMenuItemComponent } from './shared/components/sub-menu-item'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule } from '@angular/forms'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { MAT_DATE_LOCALE } from '@angular/material/core'
import { DefaultOptions } from 'apollo-client'

export function createTranslateLoader (http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}
@NgModule({
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: ApplicationInitializerFactory,
    deps: [
      TranslateService,
      Injector
    ],
    multi: true
  },
  { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }
  ],
  declarations: [
    AppComponent,

    MenuComponent,
    MenuItemComponent,
    SubMenuItemComponent
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,

    // temp
    FormsModule,
    FlexLayoutModule,

    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,

    HttpClientModule,
    ApolloModule,
    HttpLinkModule,

    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (
    apollo: Apollo,
    httpLink: HttpLink,
    loginService: LoginService,
    private translate: TranslateService,
    private notifyService: NotifyService) {
    this.getLanguageForUser()

    // bearer interceptor for requests
    const HTTP = httpLink.create({ uri: environment.graphql_api_url })

    const errorLink = onError(
      ({
        graphQLErrors, networkError
        /*, forward, operation */
      }) => {
        if (graphQLErrors) {
          graphQLErrors.map(
            ({ message, locations, path }) => {
              const messageProcessed = this.processGqlErrors(message, locations, path)
              if (messageProcessed !== '') {
                this.notifyService.notify(messageProcessed, 'error')
              }
              return false
            }
          )
        }
        if (networkError) {
          this.notifyService.notify(`[Network error]: ${networkError}` + 'this', 'error')
        }
      })

    const middleware = setContext(() => {
      return {
        headers: new HttpHeaders().set(
          'Authorization', `Bearer ${loginService.getAccessToken()}`
        )
      }
    })

    const link = middleware.concat(HTTP)

    const httpLinkWithErrorHandling = ApolloLink.from([
      errorLink,
      link
    ])

    const defaultOptions: DefaultOptions = {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore'
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      }
    }

    apollo.createDefault({
      link: httpLinkWithErrorHandling,
      ssrMode: false,
      cache: new InMemoryCache({ addTypename: false }),
      defaultOptions: defaultOptions
    })
  }

  async getLanguageForUser () {
    // TODO: Se debe de obtener de la configuración del usuario
    const userLanguage = 'es'
    if (userLanguage === null) {
      // TODO: Validar que el idioma del navegador exista como configuración del sitio
      const browserLang = this.translate.getBrowserLang()
      await this.translate.use(browserLang.match(/en|es/) ? browserLang : 'es').toPromise()
      this.translate.setDefaultLang(browserLang.match(/en|es/) ? browserLang : 'es')
    } else {
      this.translate.use(userLanguage)
      this.translate.setDefaultLang(userLanguage)
    }
  }

  processGqlErrors (message: any, locations: any, path: any): string {
    let errorMessage: string = ''
    const messageObject = message.split(' ')
    const errorCode: string = messageObject ? messageObject[0] : ''

    switch (path[0]) {
      case 'updateUser':
        if (errorCode === 'E11000') {
          const stringSplitText = message.split('{')
          const usernameSplitText = stringSplitText[Object.keys(stringSplitText).length - 1].split('username:')
          const usernameJsonString: string = '{"username":' + usernameSplitText[1]
          const user: any = JSON.parse(usernameJsonString.trim())
          errorMessage = user.username + this.translate.instant('userForm.actions.update.duplicateUser')
        }
        break
      case 'createPermission':
        if (errorCode === 'E11000') {
          if (message.indexOf('tag') !== -1) {
            errorMessage = this.translate.instant('permissionForm.save.duplicated.tag')
          }
          if (message.indexOf('name') !== -1) {
            errorMessage = this.translate.instant('permissionForm.save.duplicated.name')
          }
        }
        break
      default:
        if (errorCode === 'E11000') {
          errorMessage = this.translate.instant('messages.duplicated')
        } else {
          errorMessage = this.translate.instant('messages.errorServer') + path[0]
        }
        break
    }
    return errorMessage
  }
}
