import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './modules/auth/shared'
import { LoginGuard } from './modules/auth/shared/auth.guard/login.guard'

// const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['authentication/login'])
// const redirectAuthorizedToHome = redirectLoggedInTo(['dashboard'])
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule),
    canActivate: [LoginGuard]

    // children: CommonLayout_ROUTES
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./modules/home/home.module').then(mod => mod.HomeModule),
  //   canActivate: [AuthGuard],
  //   data: {
  //     animation: 'isRight'
  //   }
  //   // children: CommonLayout_ROUTES
  // },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(mod => mod.AdminModule),
    canActivate: [AuthGuard],
    data: {
      animation: 'isRight'
    }
    // children: CommonLayout_ROUTES
  }
  // {
  //   path: '',
  //   component: CommonLayoutComponent,
  //   ...canActivate(redirectUnauthorizedToLogin),
  //   children: CommonLayout_ROUTES
  // },
  // {
  //   path: '',
  //   component: FullLayoutComponent,
  //   children: FullLayout_ROUTES
  // },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent
  // }
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  // {
  //   path: '**',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // }
]

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
