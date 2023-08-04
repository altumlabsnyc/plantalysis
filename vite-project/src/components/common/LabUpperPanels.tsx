import useFacilitiesDetails, {
  FacilityWithAddress,
} from '@/hooks/useFacilities'
import { LabRequest } from '@/hooks/useLabOrders'
import { useUser } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import RequestDetailPanel from '../LabUpperPanels/RequestDetailPanel/RequestDetailPanel'
import OrderRequestPanel from './OrderRequestsPanel'

export default function LabUpperPanels() {
  const user = useUser()

  const { data: labFacilities } = useFacilitiesDetails(user)

  const [activeLabOrder, setActiveLabOrder] = useState<LabRequest | null>(null)
  const [activeFacility, setActiveFacility] =
    useState<FacilityWithAddress | null>(labFacilities?.[0] || null)

  return (
    <div className="w-full flex flex-wrap justify-around">
      <div className="flex flex-col justify-between gap-4 h-full">
        <OrderRequestPanel
          activeLabOrder={activeLabOrder}
          setActiveLabOrder={setActiveLabOrder}
          activeFacility={activeFacility}
          setActiveFacility={setActiveFacility}
        />
        {/* <UploadPanel /> */}
      </div>

      <RequestDetailPanel
        activeLabOrder={activeLabOrder}
        activeFacility={activeFacility}
      />
    </div>
  )
}
