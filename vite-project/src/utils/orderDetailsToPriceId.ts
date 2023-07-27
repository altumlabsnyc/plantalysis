import { ProductType, TurnaroundTime } from '@/types/supabaseAlias'

// dev
const productIds = [
  'price_1NYLCzEf36GHXrtiEJsRe3dF',
  'price_1NYLCzEf36GHXrtiulYFJsCt',
  'price_1NYLCzEf36GHXrtiNhTYb4e5',
  'price_1NYLCzEf36GHXrtiM4jG2zLs',
]
// prod
// const productIds = []

/**
 * Given a product type and a turnaround time, convert to a stripe price id
 *
 * @param productType product type
 * @param turnaroundTime turnaround time
 */
export default function orderDetailsToPriceId(
  productType: ProductType,
  turnaroundTime: TurnaroundTime,
) {
  switch (turnaroundTime) {
    case '48':
      return productIds[0]
    case '96':
      return productIds[1]
    case '168':
      return productIds[2]
    case '336':
      return productIds[3]
  }
}
