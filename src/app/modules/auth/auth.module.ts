/* eslint-disable no-useless-constructor */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MatCardModule } from '@angular/material/card'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule } from '@angular/material/menu'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSelectModule } from '@angular/material/select'
import { MatChipsModule } from '@angular/material/chips'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatCheckboxModule } from '@angular/material/checkbox'

// Shared
import { AUTH_GUARDS } from './shared'

// Containers
import { AUTH_CONTAINERS } from './containers'

// Routing
import { AuthRoutingModule } from './auth-routing.module'

// Modules
import { SharedModule } from '../../shared/shared.module'

// Components
import { AUTH_COMPONENTS } from './components'

@NgModule({
  declarations: [
    ...AUTH_CONTAINERS,
    ...AUTH_COMPONENTS
  ],
  imports: [
    // Third party
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Material
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatCardModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatProgressBarModule,
    MatCheckboxModule,

    // Routing
    AuthRoutingModule,

    // Team
    SharedModule
  ],
  providers: [
    ...AUTH_GUARDS
  ],
  exports: [
    ...AUTH_CONTAINERS
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AuthModule { }
