import { IBase } from '.'
export default interface IGenericGridColumn extends IBase {
  key: string
  display: string
  type?: string
  editable?: boolean
}
