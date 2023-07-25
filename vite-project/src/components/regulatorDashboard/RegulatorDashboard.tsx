import Dashboard, { DashboardPanel } from "@/components/Dashboard";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";
import "https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js";
import React from "react";
import "simple-datatables";
import "simple-datatables/dist/style.css";
// js
import "../assets/dashboard/js/datatables-simple-demo.js";
import "../assets/dashboard/js/scripts.js";
// css
import { Session } from "@supabase/supabase-js";
import "https://use.fontawesome.com/releases/v6.3.0/js/all.js";
import { Route } from "react-router-dom";
import "../assets/dashboard/css/styles.css";
import ApproveOrders from "./ApproveOrders.js";

interface ProducerDashboardProps {
  children: React.ReactNode;
}

function ProducerDashboard({ children }: ProducerDashboardProps) {
  const panels: DashboardPanel[] = [
    {
      link: "/dashboard/regulator/approve-orders",
      icon: <i className="fas fa-tachometer-alt" />,
      text: "Approve Orders",
    },
  ];
  return (
    <Dashboard role={"regulator"} panels={panels}>
      {children}
    </Dashboard>
  );
}

interface SessionProps {
  session: Session | null;
}

export default function ProducerDashboardRouter({ session }: SessionProps) {
  return (
    <>
      <ProducerDashboard>
        <Route path="/dashboard/regulator/approve-orders">
          <ApproveOrders session={session} />
        </Route>
      </ProducerDashboard>
    </>
  );
}
