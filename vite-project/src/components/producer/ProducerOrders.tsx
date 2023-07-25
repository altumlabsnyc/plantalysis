import { useEffect, useState } from "react"
// css
import { useUser } from "@supabase/auth-helpers-react"
import { fetchProducerOrders } from "../Authentication.js"
import { LabOrder, LabOrderTableRow } from "../UserTypes.js"
import "../assets/dashboard/css/styles.css"
import LabOrderTable from "../lab/LabOrderTable.js"

export default function ProducerOrders() {
  const [labOrders, setLabOrders] = useState<Array<LabOrderTableRow>>([])
  const [loading, setLoading] = useState(true)

  const user = useUser()

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true)
      if (user) {
        setLabOrders(
          (await fetchProducerOrders()).map((t: LabOrder): LabOrderTableRow => {
            return { ...t, status: "Claimed" }
          })
        )
        // console.log('aaaaaaaaaa')
        // console.log(temp)
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  return (
    <>
      <div className="flex">
        <p className="text-red-400">test</p>
        <p>test2</p>
      </div>
      <LabOrderTable labOrders={labOrders} showClaimed={false} />
    </>
  )
}
