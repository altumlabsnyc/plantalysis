import { useUser } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"
import { fetchClaimedOrders } from "../Authentication.js"
import { LabOrder, LabOrderTableRow } from "../UserTypes.js"
import LabOrderTable from "./LabOrderTable.js"

export default function CurrentOrders() {
  const user = useUser()

  const [labOrders, setLabOrders] = useState<Array<LabOrderTableRow>>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchOrders() {
      setLoading(true)
      if (user) {
        setLabOrders(
          (await fetchClaimedOrders()).map((t: LabOrder): LabOrderTableRow => {
            return { ...t, status: "Claimed" }
          })
        )
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  return <LabOrderTable labOrders={labOrders} showClaimed={false} />
}

// export default LabOrder;
