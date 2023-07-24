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

interface ProducerDashboardProps {
  children: React.ReactNode;
}

export default function ProducerDashboard({ children }: ProducerDashboardProps) {
  const panels: DashboardPanel[] = [
    {
      link: "/dashboard/producer/new-order",
      icon: <i className="fas fa-tachometer-alt" />,
      text: "Place New Order"
    },
    {
      link: "/dashboard/producer/orders",
      icon: <i className="fas fa-book-open"></i>,
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
