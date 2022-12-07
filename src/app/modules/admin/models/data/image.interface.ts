import { IBase } from '.'
export default interface IImage extends IBase {
  id?: string
  displayName?: string
  externalId?: string
  externalPath?: string
  externalName?: string
}
