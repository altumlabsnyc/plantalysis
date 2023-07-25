import { useUser } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"
import { fetchUnclaimedOrders } from "../Authentication.js"
import { LabOrder, LabOrderTableRow } from "../UserTypes.js"
import LabOrderTable from "./LabOrderTable.js"

export default function ClaimOrders() {
  const user = useUser()

  const [labOrders, setLabOrders] = useState<Array<LabOrderTableRow>>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchOrders() {
      setLoading(true)
      if (user) {
        setLabOrders(
          (await fetchUnclaimedOrders()).map(
            (t: LabOrder): LabOrderTableRow => {
              return { ...t, status: "Not Claimed" }
            }
          )
        )
        // console.log('aaaaaaaaaa')
        // console.log(temp)
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  return <LabOrderTable labOrders={labOrders} showClaimed={true} />
}

// export default LabOrder;
