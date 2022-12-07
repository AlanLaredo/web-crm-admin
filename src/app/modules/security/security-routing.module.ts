/* eslint-disable no-unused-vars */
// Third Party
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PermissionFormContainer, PermissionsContainer, RoleAccessContainer, RoleAccessFormContainer, UserFormContainer, UsersContainer } from './containers'

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
    path: 'permissions',
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
        path: ':permissionId/edit',
        component: PermissionFormContainer,
        data: {
          title: 'Detalle de permiso'
        }
      }
    ]
  },
  {
    path: 'role-access',
    children: [
      {
        path: '',
        component: RoleAccessContainer,
        data: {
          title: 'Listado de roles'
        }
      },
      {
        path: 'create',
        component: RoleAccessFormContainer,
        data: {
          title: 'Nuevo rol'
        }
      },
      {
        path: ':roleAccessId/edit',
        component: RoleAccessFormContainer,
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
