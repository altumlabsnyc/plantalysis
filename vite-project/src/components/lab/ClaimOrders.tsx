import { useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { LabOrder, LabOrderTableRow } from '../UserTypes.js'
import LabOrderTable from './LabOrderTable.js'
import useLabOrders, { LabOrdersRequested } from '@/hooks/useLabOrders.js'

export default function ClaimOrders() {
  const user = useUser()
  const labOrders = useLabOrders(user, LabOrdersRequested.unClaimedByLab)

  if (labOrders.isLoading) {
    return <p>Loading...</p>
  } else if (labOrders.data) {
    const labOrderRows = labOrders.data.map((order) => {
      return { ...order, status: 'Not Claimed' }
    })

    return <LabOrderTable labOrders={labOrderRows} showClaimed={false} />
  } else {
    throw new Error('Not loading but no valid data provided')
  }
}
