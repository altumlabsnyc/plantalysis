import { useUser } from '@supabase/auth-helpers-react'

import useLabOrders, { LabOrdersRequested } from '@/hooks/useLabOrders.js'

export default function CurrentOrders() {
  const user = useUser()
  const labOrders = useLabOrders(user, LabOrdersRequested.claimedByALab)

  if (labOrders.isLoading) {
    return <p>Loading...</p>
  } else if (labOrders.data) {
    const labOrderRows = labOrders.data.map((order) => {
      return { ...order, status: 'Claimed' }
    })

    return (
      <div>
        {labOrders.data.map((order) => (
          <p key={order.id}>{order.id}</p>
        ))}
      </div>
    )
    //<LabOrderTable labOrders={labOrderRows} showClaimed={false} />;
  } else {
    throw new Error('Not loading but no valid data provided')
  }
}
