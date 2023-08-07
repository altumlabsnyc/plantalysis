import { createColumnHelper } from '@tanstack/react-table'
import Panel from './Panel'
import Table from './Table/Table'

import useFacilitiesDetails, {
  FacilityWithAddress,
} from '@/hooks/useFacilities'
import { LabRequest, useUnclaimedLabOrderRequests } from '@/hooks/useLabOrders'
import { LabOrder } from '@/types/supabaseAlias'
import { useUser } from '@supabase/auth-helpers-react'
import classNames from 'classnames'
import { useEffect } from 'react'
import './assets/css/panel.css'
import Spinner from './common/Spinner'
import SelectFacility from './producer/NewOrder/SelectFacility'
// import useUnapprovedOrderRequests from "@/hooks/useUnapprovedOrderRequests";

/*
 * fields:
 * lab_order     - id
 * lab_order     - lab_user_id
 * producer_user - common_name
 *
 * relations:
 * lab_order     - batch_id
 * batch         - facility_id
 * facility      - producer_user_id
 * producer_user - common_name
 */

const columnHelper = createColumnHelper<LabRequest>()

export type LabRequestTableRow = LabOrder & {
  common_name: string
}

export interface OrderRequestPanel {
  activeLabOrder: LabRequest | null
  setActiveLabOrder: (activeLabOrder: LabRequest | null) => void
  activeFacility: FacilityWithAddress | null
  setActiveFacility: (activeFacility: FacilityWithAddress | null) => void
}

export default function OrderRequestPanel({
  activeLabOrder,
  setActiveLabOrder,
  activeFacility,
  setActiveFacility,
}: OrderRequestPanel) {
  const user = useUser()
  const { data: labFacilities } = useFacilitiesDetails(user)
  const {
    data: allOrders,
    error,
    isLoading,
    mutate,
  } = useUnclaimedLabOrderRequests(user, activeFacility?.address.state_code)

  const data = allOrders || []

  const columns = [
    // columnHelper.accessor('common_name', {
    //     cell: info => {
    //         const t = info.getValue()
    //         return t ? t : 'Unknown Producer'
    //     }
    // }),
    columnHelper.accessor('id', {
      cell: (info) => (
        <div
          className={classNames(
            { 'text-green-500': activeLabOrder?.id === info.row.original.id },
            'my-1 text-sm cursor-pointer flex items-center',
          )}
          onClick={() => setActiveLabOrder(info.row.original)}
        >
          {info.row.original.tests.map((test) => test.name).join(' | ')}
          {activeLabOrder?.id === info.row.original.id && ' (Viewing)'}
        </div>
      ),
    }),
    columnHelper.display({
      id: 'approve',
      cell: (props) => (
        <div className="w-full">
          {/* <button
            className="bg-green-500 hover:bg-green-600 transition-all w-full px-2 py-1 text-white rounded-md"
            onClick={async () => {
              // remove item from data inside mutate
              mutate((data) => {
                if (!data) return
                return data.filter((e) => e.id != props.row.original.id)
              })

              const newOrder = (
                await approveLabOrder(props.row.original.id, user)
              )[0]
              if (newOrder.id == activeLabOrder?.id) {
                activeLabOrder.lab_user_id = newOrder.lab_user_id
              }
              data = data.map((e) => {
                if (e.id == newOrder.id) {
                  e.lab_user_id = newOrder.lab_user_id
                }
                return e
              })
            }}
          >
            Claim
          </button> */}
        </div>
      ),
    }),
  ]

  useEffect(() => {
    if (!labFacilities || labFacilities?.length === 0) return

    setActiveFacility(labFacilities[0])
  }, [labFacilities])

  useEffect(() => {
    if (allOrders && allOrders.length !== 0) {
      setActiveLabOrder(allOrders[0])
    }
  }, [activeFacility, allOrders])

  return (
    <div className="mx-auto">
      <Panel>
        <div
          className="w-64 h-96 py-2 overflow-y-scroll"
          // style={{
          //   width: '323px',
          // }}
        >
          <>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64 w-full">
                <Spinner size="lg" />
              </div>
            ) : (
              <>
                <h3 style={{ color: '#457f6c' }} className="text-xl font-bold">
                  Testing Requests
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  Open requests for testing that any lab can claim. After
                  claiming, a sampling firm will contact you with next steps.
                </p>
                <SelectFacility
                  selectedFacility={activeFacility}
                  setSelectedFacility={setActiveFacility}
                />
                {activeFacility ? (
                  <div className="">
                    <Table<LabRequest>
                      data={data}
                      columns={columns}
                      hideHeader={true}
                    />
                  </div>
                ) : (
                  <p className="mt-2">
                    Please select a facility to see open lab orders
                  </p>
                )}
              </>
            )}
          </>
        </div>
      </Panel>
    </div>
  )
}
