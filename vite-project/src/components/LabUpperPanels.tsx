import { LabRequest } from '@/hooks/useLabOrders'
import { useState } from 'react'
import RequestDetailPanel from './LabUpperPanels/RequestDetailPanel/RequestDetailPanel'
import OrderRequestPanel from './OrderRequestsPanel'

export default function LabUpperPanels() {
  const [activeLabOrder, setActiveLabOrder] = useState<LabRequest | null>(null)

  return (
    <div className="w-full flex flex-wrap justify-around">
      <div className="flex flex-col justify-between gap-4 h-full">
        <OrderRequestPanel
          activeLabOrder={activeLabOrder}
          setActiveLabOrder={setActiveLabOrder}
        />
        {/* <UploadPanel /> */}
      </div>

      <RequestDetailPanel activeLabOrder={activeLabOrder} />
    </div>
  )
}
