import { UserRole } from './supabaseAlias'

/**
 * Type to use for HTML input where:
 * input.name: text displayed as prompt to the user
 * input.id: to be used as key or if attached to an icon file name, can also be used as that
 * input.type: type of the HTML input type.
 * input.options: if the type of input requires multiple options (ie checkbox, radio, etc) then
 * this array contains the options the user has
 * input.props: need alex help
 */
export default interface Input {
  name: string
  id: string
  type: string
  options?: Array<string>
  props?: { [key: string]: any }
}

/**
 * Type to help with registration of different user types
 * Each user type (regulator, producer, ...etc) is associated with a
 * userTypeField declared in constants/formInputs.
 * .code: the svg relating each user type to an icon representing it in assets folder
 * .name the name displayed to the user
 * .inputs an array with all the inputs specific to that user, to be then filled out
 * after the client chooses what user it wants to register as
 * .userType the supabase UserRole of the user
 */
export interface userTypeFields {
  code: string
  name: string
  inputs: Array<Input> | undefined
  userType: UserRole
}
