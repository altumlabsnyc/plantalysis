import React from "react";
import Dashboard from "../DashBoard.js";
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

const ProducerDashboard: React.FC = (props) => {
  const { children } = props
  const panels = [
    <a className="nav-link" href="/dashboard/producer/new-order">
      <div className="sb-nav-link-icon">
        <i className="fas fa-tachometer-alt"></i>
      </div>
      Place New Order
    </a>,
    <a className="nav-link" href="/dashboard/producer/orders">
      <div className="sb-nav-link-icon">
        <i className="fas fa-book-open"></i>
      </div>
      Current Orders
    </a>
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

export default ProducerDashboard;
