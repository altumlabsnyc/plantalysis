import Dashboard, { DashboardPanel } from "@/components/Dashboard";
import React from "react";
import { Route } from "react-router-dom";
import "../assets/dashboard/css/styles.css";
import Upload from "../regulatorDashboard/Upload.js";
import ClaimOrders from "./ClaimOrders";
import CurrentOrders from "./CurrentOrders";

interface LabDashboardProps {
  children: React.ReactNode;
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
  ];
  return (
    <Dashboard role={"lab"} panels={panels}>
      {children}
    </Dashboard>
  );
}

export default function LabDashboardRouter() {
  return (
    <LabDashboard>
      <Route path="/dashboard/lab/upload">
        <Upload />
      </Route>
      <Route path="/dashboard/lab/current-orders">
        <CurrentOrders />
      </Route>
      <Route path="/dashboard/lab/claim-orders">
        <ClaimOrders />
      </Route>
    </LabDashboard>
  );
}
