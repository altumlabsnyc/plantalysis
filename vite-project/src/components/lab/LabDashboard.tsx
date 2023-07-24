import React from 'react';
import 'simple-datatables'; 
import 'simple-datatables/dist/style.css';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';
import 'https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js';
// js
import '../assets/dashboard/js/scripts.js';
import '../assets/dashboard/js/datatables-simple-demo.js';
// css
import '../assets/dashboard/css/styles.css'
import 'https://use.fontawesome.com/releases/v6.3.0/js/all.js';
import Dashboard, { DashboardPanel } from '../DashBoard.js';
import { Session } from '@supabase/supabase-js';
import { Route } from 'react-router-dom';
import Upload from '../regulator/Upload.js';
import CurrentOrders from './CurrentOrders'
import ClaimOrders from './ClaimOrders';

interface LabDashboardProps {
  children: React.ReactNode;
}

function LabDashboard({ children }: LabDashboardProps) {
  const panels: DashboardPanel[] = [
    {
      link: "/dashboard/lab/upload",
      icon: <i className="fas fa-tachometer-alt" />,
      text: "Upload Sample Data"
    },
    {
      link: "/dashboard/lab/current-orders",
      icon: <i className="fas fa-book-open"></i>,
      text: "Current Orders"
    },
    {
      link: "/dashboard/lab/claim-new-orders",
      icon: <i className="fas fa-book-open"></i>,
      text: "Claim Lab Orders"
    }
  ]
  return (
    <Dashboard
      role={'Lab'}
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