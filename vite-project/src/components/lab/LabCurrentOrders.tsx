import { createColumnHelper } from '@tanstack/react-table'
import Panel from './../Panel'
import Table from './../Table/Table'

import useFacilitiesDetails, {
    FacilityWithAddress,
} from '@/hooks/useFacilities'
import { ClaimedOrderTableRow, LabRequest, useLabClaimedOrders, useLabOrderRequests } from '@/hooks/useLabOrders'
import { LabOrder } from '@/types/supabaseAlias'
import { useUser } from '@supabase/auth-helpers-react'
import classNames from 'classnames'
import { useEffect } from 'react'
import './../assets/css/panel.css'
import Spinner from './../common/Spinner'
import SelectFacility from './../producer/NewOrder/SelectFacility'
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

const columnHelper = createColumnHelper<ClaimedOrderTableRow>()

// export type LabRequestTableRow = LabOrder & {
//   common_name: string
// }

// export interface OrderRequestPanel {
//   activeLabOrder: LabRequest | null
//   setActiveLabOrder: (activeLabOrder: LabRequest | null) => void
//   activeFacility: FacilityWithAddress | null
//   setActiveFacility: (activeFacility: FacilityWithAddress | null) => void
// }

export default function LabCurrentOrders() {
    const user = useUser()
    const { data: labFacilities } = useFacilitiesDetails(user)
    const {
        data,
        error,
        isLoading,
    } = useLabClaimedOrders(user)


    const columns = [
        // columnHelper.accessor('common_name', {
        //     cell: info => {
        //         const t = info.getValue()
        //         return t ? t : 'Unknown Producer'
        //     }
        // }),
        columnHelper.accessor('id', {
            header: "Order #",
            cell: (info) => (
                <div>
                    {'...'+info.getValue().slice(-10)}
                </div>
            ),
        }),
        columnHelper.accessor('analysis_id', {
            header: "Analysis Uploaded",
            cell: info => (
                <div>
                    {info.getValue() == null ? 'No' : 'Yes'}
                </div>
            )
        }),
        columnHelper.accessor('facility_name', {
            header: "Facility",
            cell: info => (
                <div>
                    {info.getValue()}
                </div>
            )
        })
    ]

    return (
        <div className="flex flex-col items-center m-4 gap-4 pb-8">
            <div className="mx-auto">
                <Panel>
                    <div
                        className="w-128 h-96 py-2 overflow-y-scroll"
                    >
                        <>
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center h-64 w-full">
                                    <Spinner size="lg" />
                                </div>
                            ) : (
                                <>
                                    <h3 style={{ color: '#457f6c' }} className="text-xl font-bold">
                                        My Orders
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-2">
                                        Claimed Order
                                    </p>
                                    <Table<ClaimedOrderTableRow>
                                        data={data||[]}
                                        columns={columns}
                                    />
                                </>
                            )}
                        </>
                    </div>
                </Panel>
            </div>
        </div>
    )
}
