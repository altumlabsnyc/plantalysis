import { useEffect, useState } from 'react'

import { useUser } from '@supabase/auth-helpers-react'

import { AnalysisTableRow, OrderStatus } from '../UserTypes.js'
import AnalysisTable from './AnalysisTable.js'
import { useAnalysis, ForApproval } from '@/hooks/useAnalysis.js'
import useLabOrders, { LabOrdersRequested } from '@/hooks/useLabOrders.js'

export default function ApproveOrders() {
  const user = useUser()
  const allLabOrders = useLabOrders(user, LabOrdersRequested.allOrders)
  const analysisData = useAnalysis(user, allLabOrders.data)

  if (analysisData.data) {
    return (
      <div>
        {analysisData.data.map((order: ForApproval) => (
          <p>{order.brand_name}</p>
        ))}
      </div>
    )
  } else {
    return <p>Loading...</p>
  }
}
