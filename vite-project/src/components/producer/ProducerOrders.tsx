import { useEffect, useState } from 'react'
// css
import { useUser } from '@supabase/auth-helpers-react'
import '@/components/assets/dashboard/css/styles.css'
import {
  ProducerLabOrderDetails,
  useProducerPlacedOrders,
} from '@/hooks/useLabOrders'
import Order from './Order.js'
import Spinner from '@/components/common/Spinner'

export default function ProducerOrders() {
  const user = useUser()
  const { data: allOrders, error, isLoading } = useProducerPlacedOrders(user)
  console.log(allOrders, error)
  if (allOrders) {
    return (
      <>
        {allOrders?.map((order: ProducerLabOrderDetails) => (
          <Order orderData={order}></Order>
        ))}
      </>
    )
  } else {
    return (
      <div className="flex w-full flex-col items-center">
        <Spinner size="lg" />
      </div>
    )
  }
}
