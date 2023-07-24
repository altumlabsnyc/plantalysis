import Dashboard, { DashboardPanel } from "@/components/Dashboard.js"
import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
import "https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js"
import React from "react"
import "simple-datatables"
import "simple-datatables/dist/style.css"
// js
import "../assets/dashboard/js/datatables-simple-demo.js"
import "../assets/dashboard/js/scripts.js"
// css
import { Session } from "@supabase/supabase-js"
import "https://use.fontawesome.com/releases/v6.3.0/js/all.js"
import { Route } from "react-router-dom"
import "../assets/dashboard/css/styles.css"
import PlaceNewOrder from "./PlaceNewOrder.js"
import ProducerOrders from "./ProducerOrders.js"

interface ProducerDashboardProps {
  children: React.ReactNode
}

function ProducerDashboard({ children }: ProducerDashboardProps) {
  const panels: DashboardPanel[] = [
    {
      link: "/dashboard/producer/new-order",
      icon: <i className="fas fa-tachometer-alt" />,
      text: "Place New Order",
    },
    {
      link: "/dashboard/producer/orders",
      icon: <i className="fas fa-book-open"></i>,
      text: "Current Orders",
    },
  ]
  return (
    <Dashboard role={"Producer"} panels={panels}>
      {children}
    </Dashboard>
  )
}

interface SessionProps {
  session: Session | null
}

export default function ProducerDashboardRouter({ session }: SessionProps) {
  return (
    <>
      <Route path="/dashboard/producer/new-order">
        <ProducerDashboard>
          <PlaceNewOrder session={session} />
        </ProducerDashboard>
      </Route>
      <Route path="/dashboard/producer/orders">
        <ProducerDashboard>
          <ProducerOrders session={session} />
        </ProducerDashboard>
      </Route>
    </>
  )
}