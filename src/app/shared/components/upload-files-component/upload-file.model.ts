import { Subscription } from 'rxjs/internal/Subscription'

export class UploadFileModel {
  data?: any
  state?: string
  inProgress?: boolean
  progress?: number
  canRetry?: boolean
  canCancel?: boolean
  sub?: Subscription
}
