/* eslint-disable no-unused-vars */
// Third Party
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PageNotFoundComponent } from 'src/app/shared/components'
import { AuthGuard } from '../auth/shared'

import {
  ClientFormContainer,
  ClientGridContainer,
  ClientServiceFormContainer,
  CompanyFormContainer,
  CompanyGridContainer,
  CompanyGroupFormContainer,
  CompanyGroupGridContainer,
  EmployeeFormContainer,
  EmployeeGridContainer,
  MainContainer
} from './containers'
import { ClientServiceGridContainer } from './containers/client-service-grid'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainContainer,
    children: [
      {
        path: '',
        loadChildren: () => import('../home/home.module').then(mod => mod.HomeModule)
      },
      {
        path: 'security',
        loadChildren: () => import('../security/security.module').then(mod => mod.SecurityModule)
      },
      {
        path: 'client',
        children: [
          {
            path: 'clients',
            component: ClientGridContainer,
            canActivate: [AuthGuard]
          },
          {
            path: 'clients/:elementId/edit',
            component: ClientFormContainer,
            canActivate: [AuthGuard]
          },
          {
            path: 'clients/create',
            component: ClientFormContainer,
            canActivate: [AuthGuard]
          },
          {
            path: 'clients/:elementId/services',
            component: ClientServiceGridContainer,
            canActivate: [AuthGuard]
          },
          {
            path: 'clients/:elementId/services/create',
            component: ClientServiceFormContainer,
            canActivate: [AuthGuard]
          },
          {
            path: 'clients/:elementId/services/:clientServiceId/edit',
            component: ClientServiceFormContainer,
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'company',
        children: [
          {
            path: 'company-group',
            component: CompanyGroupGridContainer,
            data: {
              title: 'Listado de grupos de empresa'
            }
          },
          {
            path: 'company-group/create',
            component: CompanyGroupFormContainer,
            data: {
              title: 'Nuevo grupo'
            }
          },
          {
            path: 'company-group/:elementId/edit',
            component: CompanyGroupFormContainer,
            data: {
              title: 'Edición de grupo de empresa'
            }
          },
          {
            path: 'company',
            component: CompanyGridContainer,
            data: {
              title: 'Listado de empresa'
            }
          },
          {
            path: 'company/create',
            component: CompanyFormContainer,
            data: {
              title: 'Nueva empresa'
            }
          },
          {
            path: 'company/:elementId/edit',
            component: CompanyFormContainer,
            data: {
              title: 'Edición de empresa'
            }
          }
        ]
      },
      {
        path: 'employee',
        children: [
          {
            path: 'employees',
            component: EmployeeGridContainer,
            data: {
              title: 'Listado de empleados'
            }
          },
          {
            path: 'employees/create',
            component: EmployeeFormContainer,
            data: {
              title: 'Nueva empleado'
            }
          },
          {
            path: 'employees/:elementId/edit',
            component: EmployeeFormContainer,
            data: {
              title: 'Edición de empleado'
            }
          }
        ]
      },
      {
        path: 'catalogos',
        children: [
          // {
          //   path: 'dispositivos',
          //   component: DevicesContainer,
          //   canActivate: [AuthGuard]
          // },
        ],
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        canActivate: [AuthGuard],
        component: PageNotFoundComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
