import { UserRole } from './supabaseAlias'

/**
 * Represents a generic input interface with potential additional properties.
 */
export default interface Input {
  /** The name of the input. */
  name: string;
  /** The unique identifier for the input. */
  id: string;
  /** The type of the input (e.g., "text", "number", "checkbox"). */
  type: string;
  /** Optional list of options if the input type supports it (e.g., dropdowns). */
  options?: Array<string>;
  /** Any additional properties that the input might have. */
  props?: { [key: string]: any };
}

/**
 * Represents the fields associated with a specific user type.
 */
export interface userTypeFields {
  /** The code associated with the user type. */
  code: string;
  /** The name or description of the user type. */
  name: string;
  /** An array of inputs associated with this user type. */
  inputs: Array<Input> | undefined;
  /** The role associated with the user type, as defined in `UserRole`. */
  userType: UserRole;
}
