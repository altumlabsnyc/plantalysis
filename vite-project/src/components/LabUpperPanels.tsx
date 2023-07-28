import { LabOrder } from '@/types/supabaseAlias'
import { useState } from 'react'
import OrderRequestPanel, { LabRequestTableRow } from './OrderRequestsPanel'
import RequestDetailPanel from './LabUpperPanels/RequestDetailPanel/RequestDetailPanel'
import UploadPanel from './UploadPanel'

export default function LabUpperPanels() {
  const [activeLabOrder, setActiveLabOrder] = useState<LabOrder | null>(null)
  const [data, setData] = useState<LabRequestTableRow[]>([])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '30px',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'stretch',
        }}
      >
        <OrderRequestPanel
          activeLabOrder={activeLabOrder}
          setActiveLabOrder={setActiveLabOrder}
        />
        <UploadPanel />
      </div>

      <RequestDetailPanel activeLabOrder={activeLabOrder} />
    </div>
  )
}
