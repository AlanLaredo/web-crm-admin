import { IBase } from '.'
export default interface IGeneralGridColumn extends IBase {
  id: string
  name: string
  actions?: string[]
}
