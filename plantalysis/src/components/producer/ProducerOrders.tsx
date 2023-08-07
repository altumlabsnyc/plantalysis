// css
import '@/components/assets/dashboard/css/styles.css'
import Spinner from '@/components/common/Spinner'
import {
  ProducerLabOrderDetails,
  useProducerPlacedOrders,
} from '@/hooks/useLabOrders'
import { useUser } from '@supabase/auth-helpers-react'
import Order from './Order'

export default function ProducerOrders() {
  const user = useUser()
  const { data: allOrders, error, isLoading } = useProducerPlacedOrders(user)
  if (allOrders) {
    const sortedOrders = [...allOrders].sort((a, b) => {
      // sorts in descending order
      const dateA = new Date(a.order_time).getTime()
      const dateB = new Date(b.order_time).getTime()
      return  dateB - dateA
    })
    return (
      <div className="mx-4 py-2 p-4">
        {sortedOrders?.map((order: ProducerLabOrderDetails) => (
          <Order key={order.id} orderData={order} />
        ))}
      </div>
    )
  } else {
    return (
      <div className="flex w-full flex-col items-center">
        <Spinner size="lg" />
      </div>
    )
  }
}
