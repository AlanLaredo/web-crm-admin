/* eslint-disable no-unused-vars */
// Third Party
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PermissionFormContainer, PermissionsContainer, UserFormContainer, UserRoleFormContainer, UserRoleGridContainer, UsersContainer } from './containers'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    children: [{
      path: '',
      component: UsersContainer,
      data: {
        title: 'Nuevo usuario'
      }
    },
    {
      path: 'create',
      component: UserFormContainer,
      data: {
        title: 'Nuevo usuario'
      }
    },
    {
      path: ':userId/edit',
      component: UserFormContainer,
      data: {
        title: 'Detalle de usuario'
      }
    }
    ]
  },
  {
    path: 'role-permissions',
    children: [
      {
        path: '',
        component: PermissionsContainer,
        data: {
          title: 'Nuevo permiso'
        }
      },
      {
        path: 'create',
        component: PermissionFormContainer,
        data: {
          title: 'Nuevo permiso'
        }
      },
      {
        path: ':elementId/edit',
        component: PermissionFormContainer,
        data: {
          title: 'Detalle de permiso'
        }
      }
    ]
  },
  {
    path: 'user-role',
    children: [
      {
        path: '',
        component: UserRoleGridContainer,
        data: {
          title: 'Listado de roles'
        }
      },
      {
        path: 'create',
        component: UserRoleFormContainer,
        data: {
          title: 'Nuevo rol'
        }
      },
      {
        path: ':elementId/edit',
        component: UserRoleFormContainer,
        data: {
          title: 'Edición de rol'
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
