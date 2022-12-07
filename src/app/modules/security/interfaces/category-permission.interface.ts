import { IPermission } from 'src/app/shared/interfaces'

export interface ICategoryPermission {
  name: string;
  permissions: IPermission[];
}
