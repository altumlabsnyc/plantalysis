import useLabOrders, { LabOrdersRequested } from '@/hooks/useLabOrders.js'
import { useUser } from '@supabase/auth-helpers-react'

export default function ClaimOrders() {
  const user = useUser()
  const labOrders = useLabOrders(user, LabOrdersRequested.unClaimedByLab)

  if (labOrders.isLoading) {
    return <p>Loading...</p>
  } else if (labOrders.data) {
    const labOrderRows = labOrders.data.map((order) => {
      return { ...order, status: 'Not Claimed' }
    })

    return (
      <div>
        {labOrders.data.map((order) => (
          <p key={order.id}>{order.id}</p>
        ))}
      </div>
    )
    // <LabOrderTable labOrders={labOrderRows} showClaimed={false} />;
  } else {
    throw new Error('Not loading but no valid data provided')
  }
}
