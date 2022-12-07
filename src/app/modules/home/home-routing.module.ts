/* eslint-disable no-unused-vars */
// Third Party
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DashboardContainer } from './containers/dashboard/dashboard.container'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: DashboardContainer
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
