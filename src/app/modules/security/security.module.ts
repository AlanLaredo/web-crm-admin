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
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatTreeModule } from '@angular/material/tree'
import { MatTabsModule } from '@angular/material/tabs'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatListModule } from '@angular/material/list'
import { MatDatepickerModule } from '@angular/material/datepicker'

// Containers
import { SECURITY_CONTAINERS } from './containers'

// Routing
import { SecurityRoutingModule } from './security-routing.module'

// Modules
import { SharedModule } from '../../shared/shared.module'

// Components
import { SECURITY_COMPONENTS } from './components'
@NgModule({
  declarations: [
    ...SECURITY_CONTAINERS,
    ...SECURITY_COMPONENTS
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
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTreeModule,
    MatTabsModule,
    MatExpansionModule,
    MatListModule,
    MatDatepickerModule,

    // Team
    SecurityRoutingModule,
    SharedModule
  ],
  providers: [],
  exports: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SecurityModule { }
