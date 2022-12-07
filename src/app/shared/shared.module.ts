/* eslint-disable no-useless-constructor */
// Third party
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { RouterModule } from '@angular/router'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

// Components
import { SHARED_COMPONENTS } from './components'

// Material
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatChipsModule } from '@angular/material/chips'
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatDialogModule } from '@angular/material/dialog'
import { MatRippleModule } from '@angular/material/core'
import { MatSnackBarModule } from '@angular/material/snack-bar'

// import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker'

// Services
import { SHARED_SERVICES } from './services'

// Directives
import { SHARED_DIRECTIVES } from './directives'
import { HttpAuthenticationInterceptor, HttpErrorExceptionIntercept } from './interceptors'

// Para clases puras no se utiliza el export
export function createTranslateLoader (http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}
@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES
  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatChipsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatRippleModule,
    MatProgressBarModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatTooltipModule,
    // NgxMatTimepickerModule,
    // NgxMatNativeDateModule,
    // NgxMatDatetimePickerModule,

    FormsModule,
    ReactiveFormsModule,
    TranslateModule

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    ...SHARED_SERVICES,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthenticationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorExceptionIntercept,
      multi: true
    }
  ],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES,
    TranslateModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class SharedModule {
  constructor (
  ) { }
}
