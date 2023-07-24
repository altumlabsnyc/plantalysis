import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
import "https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js"
import { useEffect, useState } from "react"
import "simple-datatables"
import "simple-datatables/dist/style.css"
// js
import "../assets/dashboard/js/datatables-simple-demo.js"
import "../assets/dashboard/js/scripts.js"
// css
import { Session } from "@supabase/supabase-js"
import "https://use.fontawesome.com/releases/v6.3.0/js/all.js"
import { fetchProducerOrders } from "../Authentication.js"
import { LabOrder, LabOrderTableRow } from "../UserTypes.js"
import "../assets/dashboard/css/styles.css"
import LabOrderTable from "../lab/LabOrderTable.js"

interface SessionProps {
  session: Session | null
}

export default function ProducerOrders({ session }: SessionProps) {
  const [labOrders, setLabOrders] = useState<Array<LabOrderTableRow>>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchOrders() {
      setLoading(true)
      if (session) {
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
  }, [session])

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
