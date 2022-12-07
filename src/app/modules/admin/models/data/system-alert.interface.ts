import { IBase } from '.'

export default interface ISystemAlert extends IBase {
  id?: string
  userId: string
  name: string
  description: string
  viewedAt?: Date
  attendedAt?: Date
  uniqKey: string
  systemAlertOverdueVisit?: any
  systemAlertAfterHoursActivityUser?: any
  systemAlertVisitAuthorizationCode?: any
  createdAt?: Date
}
