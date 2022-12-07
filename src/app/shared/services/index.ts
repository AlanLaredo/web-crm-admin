import { GraphqlService } from './graphql'
import { LocalService } from './local'
import { MenuService } from './menu'
import { MenuLeftService } from '../../modules/admin/services/menu-left.service'
import { MenuRightService } from '../../modules/admin/services/menu-right.service'
import { NotifyService } from './notify/notify.service'
import { SessionService } from './session'
import { FileService } from './file.service'

export const SHARED_SERVICES = [
  SessionService,
  LocalService,
  GraphqlService,
  NotifyService,
  MenuService,
  MenuLeftService,
  MenuRightService,
  FileService
]

export {
  SessionService,
  LocalService,
  GraphqlService,
  NotifyService,
  MenuService,
  MenuLeftService,
  MenuRightService,
  FileService
}
