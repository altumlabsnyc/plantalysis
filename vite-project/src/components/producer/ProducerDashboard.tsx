import React from "react";
import Dashboard, { DashboardPanel } from "../DashBoard.js";
import "simple-datatables";
import "simple-datatables/dist/style.css";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";
import "https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js";
// js
import "../assets/dashboard/js/scripts.js";
import "../assets/dashboard/js/datatables-simple-demo.js";
// css
import "../assets/dashboard/css/styles.css";
import "https://use.fontawesome.com/releases/v6.3.0/js/all.js";
import { Route } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import PlaceNewOrder from "./PlaceNewOrder.js";
import ProducerOrders from "./ProducerOrders.js";

interface ProducerDashboardProps {
  children: React.ReactNode;
}

function ProducerDashboard({ children }: ProducerDashboardProps) {
  const panels: DashboardPanel[] = [
    {
      link: "/dashboard/producer/new-order",
      icon: <i className="fas fa-tachometer-alt" />,
      text: "Place New Order"
    },
    {
      link: "/dashboard/producer/orders",
      icon: <i className="fas fa-book-open" />,
      text: "Current Orders"
    }
  ]
  return (
    <Dashboard
      role={'Producer'}
      panels={panels}
    >
      {children}
    </Dashboard>
  );
};

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