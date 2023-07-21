import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
import "https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js"
import "simple-datatables"
import "simple-datatables/dist/style.css"
// js
import "../assets/dashboard/js/datatables-simple-demo.js"
import "../assets/dashboard/js/scripts.js"
// css
import { Session } from "@supabase/supabase-js"
import "https://use.fontawesome.com/releases/v6.3.0/js/all.js"
import "../assets/dashboard/css/styles.css"
import PlaceNewOrder from "../producer/PlaceNewOrder.js"
import ProducerDashboard from "./ProducerDashboard.js"

interface SessionProps {
  session: Session | null
}

export default function ProdPlaceOrder({ session }: SessionProps) {
  return (
    <ProducerDashboard>{<PlaceNewOrder session={session} />}</ProducerDashboard>
  )
}

// export default LabOrder;
