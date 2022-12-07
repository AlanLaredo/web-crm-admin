import { IBase } from '.'

export default interface ICatalog extends IBase {
  id?: string
  name: string
  description?: string
}
