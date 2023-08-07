import {
  developerPriceIds,
  productionPriceIds,
} from '@/constants/stripeConstants'
import { TurnaroundTime } from '@/types/supabaseAlias'

/**
 * Given a product type and a turnaround time, convert to a stripe price id
 *
 * @param turnaroundTime turnaround time
 */
export default function orderDetailsToPriceId(turnaroundTime: TurnaroundTime) {
  const ids = import.meta.env.DEV ? developerPriceIds : productionPriceIds

  switch (turnaroundTime) {
    case '48':
      return ids[0]
    case '96':
      return ids[1]
    case '168':
      return ids[2]
    case '336':
      return ids[3]
  }
}
