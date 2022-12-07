import { ITokenDecoded } from './token-decoded.interface'
import { AuthGuard } from './auth.guard'

export const AUTH_GUARDS = [
  AuthGuard
]

export {
  ITokenDecoded,
  AuthGuard
}
