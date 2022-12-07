import { IBase } from '.'
export default interface IClient extends IBase {
  id?: string
  name: string
  email?: string
  managerName: string
  legalRepresentative: string
  contactNumbers: string[]
  postalCode?: string
  republicState: string
  municipality: string
  suburb: string
  street: string
  locationReferences?: string
  socialReason?: string
  fiscalAddress?: string
  usageCfdi?: string
  rfc?: string
  fiscalEmail?: string
}
