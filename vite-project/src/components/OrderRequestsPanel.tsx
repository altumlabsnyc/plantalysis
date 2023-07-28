import { createColumnHelper } from '@tanstack/react-table'
import Panel from './Panel'
import Table from './Table/Table'

import { approveLabOrder } from '@/hooks/approveLabOrder'
import {
  getUnClaimedOrders,
  useOrderRequestsPanelOrders,
} from '@/hooks/useLabOrders'
import { LabOrder } from '@/types/supabaseAlias'
import { useUser } from '@supabase/auth-helpers-react'
import './assets/css/panel.css'
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

const columnHelper = createColumnHelper<LabRequestTableRow>()

export type LabRequestTableRow = LabOrder & {
  common_name: string
}

export interface OrderRequestPanel {
  activeLabOrder: LabOrder | null
  setActiveLabOrder: (activeLabOrder: LabOrder | null) => void
}

export default function OrderRequestPanel({
  activeLabOrder,
  setActiveLabOrder,
}: OrderRequestPanel) {
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
          style={{
            color: '#457F6C',
            fontSize: '18px',
            fontFamily: 'Poppins',
            fontWeight: 400,
          }}
          onClick={() => setActiveLabOrder(info.row.original)}
        >
          View Request
        </div>
      ),
    }),
    columnHelper.display({
      id: 'approve',
      cell: (props) => (
        <div
          onClick={() => {
            approveLabOrder(props.row.original.id, user)
          }}
        >
          Approve?
        </div>
      ),
    }),
  ]
  const user = useUser()
  const {
    data: allOrders,
    error,
    isLoading,
  } = useOrderRequestsPanelOrders(user)
  const data =
    allOrders && user
      ? getUnClaimedOrders(allOrders as LabOrder[], user) as LabRequestTableRow[]
      : []

  if (data.length && !activeLabOrder) {
    setActiveLabOrder(data[0])
  }
  return (
    <div style={{ margin: 'auto 0' }}>
      <Panel>
        <div
          style={{
            width: '323px',
          }}
        >
          <div className="panel-title">Producer Requests</div>
          <Table<LabRequestTableRow> data={data} columns={columns} hideHeader={true} />
        </div>
      </Panel>
    </div>
  )
}
