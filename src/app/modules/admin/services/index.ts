import { ClientService } from './client.service'
import { MenuLeftService } from './menu-left.service'
import { MenuRightService } from './menu-right.service'
import { SystemAlertService } from './system-alert.service'
import { ImageService } from './image.service'
import { AwsFileService } from './aws-file-service'

export const ADMIN_SERVICES = [
  ClientService,
  SystemAlertService,
  ImageService,
  AwsFileService
]

export {
  MenuLeftService,
  MenuRightService,
  ClientService,
  SystemAlertService,
  ImageService,
  AwsFileService
}
