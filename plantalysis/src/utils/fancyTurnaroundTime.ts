import { TurnaroundTime } from '@/types/supabaseAlias'

/**
 * Converts a numeric turnaround time into a more human-readable format.
 * 
 * This function takes a turnaround time value and returns a string representation
 * that's more user-friendly. For instance, it converts "168" to "1 week".
 * 
 * @param {TurnaroundTime} turnaroundTime - The numeric turnaround time value.
 * @returns {string | undefined} The human-readable format of the turnaround time or undefined if the input doesn't match any case.
 */
export default function fancyTurnaroundTime(turnaroundTime: TurnaroundTime): string | undefined {
  switch (turnaroundTime) {
    case '48':
      return '48 hours'
    case '96':
      return '96 hours'
    case '168':
      return '1 week'
    case '336':
      return '2 weeks'
    // Consider adding a default case if there's a possibility of other values.
  }
}
