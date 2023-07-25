import Dashboard, { DashboardPanel } from "@/components/Dashboard"
import { Session } from "@supabase/supabase-js"
import React from "react"
import { Route } from "react-router-dom"
import "../assets/dashboard/css/styles.css"
import ApproveOrders from "./ApproveOrders.js"

interface ProducerDashboardProps {
  children: React.ReactNode
}

function ProducerDashboard({ children }: ProducerDashboardProps) {
  const panels: DashboardPanel[] = [
    {
      link: "/dashboard/regulator/approve-orders",
      icon: <i className="fas fa-tachometer-alt" />,
      text: "Approve Orders",
    },
  ]
  return (
    <Dashboard role={"regulator"} panels={panels}>
      {children}
    </Dashboard>
  )
}

interface SessionProps {
  session: Session | null
}

export default function ProducerDashboardRouter() {
  return (
    <>
      <ProducerDashboard>
        <Route path="/dashboard/regulator/approve-orders">
          <ApproveOrders />
        </Route>
      </ProducerDashboard>
    </>
  )
}
