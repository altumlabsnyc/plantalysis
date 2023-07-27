import { useUser } from '@supabase/auth-helpers-react'

import { ForApproval, useAnalysis } from '@/hooks/useAnalysis.js'
import useLabOrders, { LabOrdersRequested } from '@/hooks/useLabOrders.js'

export default function ApproveOrders() {
  const user = useUser()
  const allLabOrders = useLabOrders(user, LabOrdersRequested.allOrders)
  const analysisData = useAnalysis(user, allLabOrders.data)

  if (analysisData.data) {
    return (
      <div>
        {analysisData.data.map((order: ForApproval) => (
          <p key={order.sku}>{order.brand_name}</p>
        ))}
      </div>
    )
  } else {
    return <p>Loading...</p>
  }
}
