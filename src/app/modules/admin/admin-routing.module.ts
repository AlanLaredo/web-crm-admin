/* eslint-disable no-unused-vars */
// Third Party
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PageNotFoundComponent } from 'src/app/shared/components'
import { AuthGuard } from '../auth/shared'
import {
  ClientFormContainer,
  ClientsContainer,
  MainContainer
} from './containers'

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
        path: 'clientes',
        component: ClientsContainer,
        canActivate: [AuthGuard]
      },
      {
        path: 'clientes/:clientId/edit',
        component: ClientFormContainer,
        canActivate: [AuthGuard]
      },
      {
        path: 'clientes/create',
        component: ClientFormContainer,
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
