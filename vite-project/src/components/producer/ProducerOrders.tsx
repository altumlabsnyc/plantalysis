import { useEffect, useState } from 'react'
// css
import { useUser } from '@supabase/auth-helpers-react'
import { fetchProducerOrders } from '../Authentication.js'
import { LabOrderTableRow } from '../UserTypes.js'
import { LabOrder } from '@/types/supabaseAlias.js'
import '../assets/dashboard/css/styles.css'
import LabOrderTable from '../lab/LabOrderTable.js'
import useLabOrders, { LabOrdersRequested } from '@/hooks/useLabOrders'
import Table from '@/components/Table/Table.js'
import { ColumnDef } from '@tanstack/react-table'

export default function ProducerOrders() {
  const [labOrders, setLabOrders] = useState<Array<LabOrderTableRow>>([])
  const [loading, setLoading] = useState(true)

  const user = useUser()
  const allOrders = useLabOrders(user, LabOrdersRequested.ofAProducer)

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true)
      if (user) {
        setLabOrders(
          (await fetchProducerOrders()).map((t: LabOrder): LabOrderTableRow => {
            return { ...t, status: 'Claimed' }
          }),
        )
        // console.log('aaaaaaaaaa')
        // console.log(temp)
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  interface TempTable {
    id: string
    location: string | null
    order_time: string
  }
  const tempData = labOrders.map((order) => {
    const row: TempTable = {
      id: order.id,
      location: order.location,
      order_time: order.order_time,
    }
    return row
  })

  const columns: ColumnDef<TempTable, string>[] = [
    {
      Header: 'Order ID',
      accessor: 'id',
      id: 'id',
    },
    {
      Header: 'Pickup Location',
      accessor: 'location',
      id: 'location',
    },
    {
      Header: 'Info',
      accessor: 'order_time',
      id: 'strain_info',
    },
  ].flatMap((c: any) => c.columns) // remove comment to drop header groups

  return (
    <>
      {allOrders.data && (
        <div>
          <Table<TempTable> data={labOrders} columns={columns}></Table>
        </div>
      )}
    </>
  )
}
