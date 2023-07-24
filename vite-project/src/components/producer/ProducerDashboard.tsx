import Dashboard, { DashboardPanel } from "@/components"
import React from "react"
import { Session } from "@supabase/supabase-js"
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
      icon: <i className="fas fa-book-open" />,
      text: "Current Orders"
    }
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
      <ProducerDashboard>
        <Route path="/dashboard/producer/new-order">
          <PlaceNewOrder session={session} />
        </Route>
        <Route path="/dashboard/producer/orders">
          <ProducerOrders session={session} />
        </Route>
      </ProducerDashboard>
    </>
  )
}
