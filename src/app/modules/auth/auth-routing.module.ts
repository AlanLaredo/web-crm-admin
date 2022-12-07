/* eslint-disable no-unused-vars */
// Third Party
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// Containers
import {
  LoginContainer
} from './containers/login'

const routes: Routes = [
  {
    path: '',
    component: LoginContainer
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
