import { UserRole } from './supabaseAlias'

export default interface Input {
  name: string
  id: string
  type: string
  options?: Array<string>
}

export interface userTypeFields {
  code: string
  name: string
  inputs: Array<Input> | undefined
  userType: UserRole
}
