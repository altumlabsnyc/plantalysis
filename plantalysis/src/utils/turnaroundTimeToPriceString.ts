import { TurnaroundTime } from '@/types/supabaseAlias'

/**
 * Given a turnaround time, convert to a price in dollars
 * @param turnaroundTime turnaround time
 * @returns the price in dollars
 */
export default function turnaroundTimeToPrice(turnaroundTime: TurnaroundTime) {
  switch (turnaroundTime) {
    case '48':
      return 800
    case '96':
      return 700
    case '168':
      return 600
    case '336':
      return 500
  }
}
