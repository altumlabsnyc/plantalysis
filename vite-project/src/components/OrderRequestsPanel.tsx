import Panel from './Panel'
import Table from './Table/Table'
import { createColumnHelper } from '@tanstack/react-table'

import './assets/css/panel.css'
import { approveLabOrder } from '@/hooks/approveLabOrder'
import {
  useOrderRequestsPanelOrders,
  getUnClaimedOrders,
} from '@/hooks/useLabOrders'
import { useUser } from '@supabase/auth-helpers-react'
import { LabOrder } from '@/types/supabaseAlias'
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

const columnHelper = createColumnHelper<LabOrder>()

interface OrderRequestPanel {
  setActiveLabOrder: (activeLabOrder: LabOrder | null) => void
}

export default function OrderRequestPanel({
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
    allOrders && user ? getUnClaimedOrders(allOrders as LabOrder[], user) : []
  return (
    <div style={{ margin: 'auto 0' }}>
      <Panel>
        <div
          style={{
            width: '323px',
          }}
        >
          <div className="panel-title">Producer Requests</div>
          <Table<LabOrder> data={data} columns={columns} hideHeader={true} />
        </div>
      </Panel>
    </div>
  )
}
