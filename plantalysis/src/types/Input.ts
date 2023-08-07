import { UserRole } from './supabaseAlias'

export default interface Input {
  name: string
  id: string
  type: string
  options?: Array<string>
  props?: { [key: string]: any }
}

export interface userTypeFields {
  code: string
  name: string
  inputs: Array<Input> | undefined
  userType: UserRole
}
