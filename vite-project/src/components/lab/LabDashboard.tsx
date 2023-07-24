import React from "react"
import Dashboard, { DashboardPanel } from "@/components/Dashboard"
import { Session } from "@supabase/supabase-js"
import { Route } from "react-router-dom"
import "../assets/dashboard/css/styles.css"
import Upload from "../regulatorDashboard/Upload.js"
import ClaimOrders from "./ClaimOrders"
import CurrentOrders from "./CurrentOrders"

interface LabDashboardProps {
  children: React.ReactNode
}

function LabDashboard({ children }: LabDashboardProps) {
  const panels: DashboardPanel[] = [
    {
      link: "/dashboard/lab/upload",
      icon: <i className="fas fa-tachometer-alt" />,
      text: "Upload Sample Data",
    },
    {
      link: "/dashboard/lab/current-orders",
      icon: <i className="fas fa-book-open"></i>,
      text: "Current Orders",
    },
    {
      link: "/dashboard/lab/claim-new-orders",
      icon: <i className="fas fa-book-open"></i>,
      text: "Claim Lab Orders",
    },
  ]
  return (
    <Dashboard role={"Lab"} panels={panels}>
      {children}
    </Dashboard>
  )
}

interface SessionProps {
  session: Session | null
}

export default function LabDashboardRouter({ session }: SessionProps) {
  return (
    <>
      <Route path="/dashboard/lab/upload">
        <Upload />
      </Route>
      <Route path="/dashboard/lab/current-orders">
        <LabDashboard>
          <CurrentOrders session={session} />
        </LabDashboard>
      </Route>
      <Route path="/dashboard/lab/claim-orders">
        <LabDashboard>
          <ClaimOrders session={session} />
        </LabDashboard>
      </Route>
    </>
  )
}
