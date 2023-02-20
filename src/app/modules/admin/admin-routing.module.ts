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
  MainContainer,
  PositionFormContainer,
  PositionGridContainer,
  OperationDragAndDropContainer,
  CustomerGridContainer,
  EmployeeReassignmentGridContainer,
  JobVacancyFormContainer,
  RecruitGridContainer,
  OperationBinnacleGridContainer,
  PrenominalGridContainer
} from './containers'
import { ClientServiceGridContainer } from './containers/client-service-grid'
import { JobVacancyGridContainer } from './containers/job-vacancy-grid'
import { RecruitFormContainer } from './containers/recruit-form/recruit-form.container'

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
        path: 'clients',
        children: [
          {
            path: '',
            component: ClientGridContainer,
            canActivate: [AuthGuard]
          },
          {
            path: ':elementId/edit',
            component: ClientFormContainer,
            canActivate: [AuthGuard]
          },
          {
            path: 'create',
            component: ClientFormContainer,
            canActivate: [AuthGuard]
          },
          {
            path: ':elementId/services',
            component: ClientServiceGridContainer,
            canActivate: [AuthGuard]
          },
          {
            path: ':elementId/services/create',
            component: ClientServiceFormContainer,
            canActivate: [AuthGuard]
          },
          {
            path: ':elementId/services/:clientServiceId/edit',
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
        path: 'process',
        children: [
          {
            path: 'process',
            component: OperationDragAndDropContainer,
            data: {
              title: 'Listado de grupos de procesos'
            }
          },
          {
            path: 'process/customer',
            children: [
              {
                path: ':customerId/client/create',
                component: ClientFormContainer,
                data: {
                  title: 'Registro de cliente'
                }
              }, {
                path: ':customerId/client/:elementId/edit',
                component: ClientFormContainer,
                data: {
                  title: 'Registro de cliente'
                }
              }, {
                path: ':customerId/clientService/create',
                component: ClientServiceFormContainer,
                data: {
                  title: 'Registro de servicio'
                }
              }, {
                path: ':customerId/clientService/:elementId/edit',
                component: ClientServiceFormContainer,
                data: {
                  title: 'Registro de servicio'
                }
              }
            ]
          },
          {
            path: 'customer',
            component: CustomerGridContainer,
            data: {
              title: 'Listado de grupos de prospectos'
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
          },
          {
            path: 'employee-reassignment',
            component: EmployeeReassignmentGridContainer,
            data: {
              title: 'Listado de reasignación'
            }
          }
        ]
      },
      {
        path: 'recruitment',
        children: [
          {
            path: 'job-vacancies',
            component: JobVacancyGridContainer,
            data: {
              title: 'Listado de vacantes'
            }
          },
          {
            path: 'job-vacancies/create',
            component: JobVacancyFormContainer,
            data: {
              title: 'Nueva vacante'
            }
          },
          {
            path: 'job-vacancies/:elementId/edit',
            component: JobVacancyFormContainer,
            data: {
              title: 'Edición de vacantes'
            }
          },
          {
            path: 'job-vacancies/:elementId/recruits',
            component: RecruitGridContainer,
            data: {
              title: 'Edición de reclutas'
            }
          },
          {
            path: 'job-vacancies/:elementId/recruits/create',
            component: RecruitFormContainer,
            data: {
              title: 'Nueva empleado'
            }
          },
          {
            path: 'job-vacancies/:elementId/recruits/:recruitId/edit',
            component: RecruitFormContainer,
            data: {
              title: 'Edición de empleado'
            }
          },
          {
            path: 'job-vacancies/:jobVacancyId/recruits/:recruitId/edit/employee',
            component: EmployeeFormContainer,
            data: {
              title: 'Nuevo empleado'
            }
          },
          {
            path: 'position',
            component: PositionGridContainer,
            data: {
              title: 'Listado de puestos'
            }
          },
          {
            path: 'position/create',
            component: PositionFormContainer,
            data: {
              title: 'Nueva puesto'
            }
          },
          {
            path: 'position/:elementId/edit',
            component: PositionFormContainer,
            data: {
              title: 'Edición de puesto'
            }
          }
        ]
      },
      {
        path: 'operation-binnacle',
        component: OperationBinnacleGridContainer,
        canActivate: [AuthGuard]
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
        path: 'prenominal',
        component: PrenominalGridContainer,
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
