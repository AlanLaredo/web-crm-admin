/* eslint-disable no-useless-constructor */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MatCardModule } from '@angular/material/card'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule } from '@angular/material/menu'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSelectModule } from '@angular/material/select'
import { MatChipsModule } from '@angular/material/chips'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatBadgeModule } from '@angular/material/badge'
import { MatTableModule } from '@angular/material/table'
import { MatStepperModule } from '@angular/material/stepper'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatRadioModule } from '@angular/material/radio'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

// Routing
import { AdminRoutingModule } from './admin-routing.module'

// Modules
import { SharedModule } from '../../shared/shared.module'

// Containers
import { ADMIN_CONTAINERS } from './containers'

// Components
import { ADMIN_COMPONENTS, ADMIN_ENTRY_COMPONENTS } from './components'

import { FlexLayoutModule } from '@angular/flex-layout'
import { MatListModule } from '@angular/material/list'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [
    ...ADMIN_CONTAINERS,
    ...ADMIN_COMPONENTS
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
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatCardModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatTableModule,
    MatListModule,
    MatStepperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatRadioModule,
    MatButtonModule,
    MatSlideToggleModule,

    // temp
    FlexLayoutModule,

    // Team
    AdminRoutingModule,
    SharedModule
  ],
  providers: [
  ],
  exports: [
  ],
  entryComponents: [
    ADMIN_ENTRY_COMPONENTS
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AdminModule { }
