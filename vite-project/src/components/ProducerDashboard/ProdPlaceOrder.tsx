import React, { useEffect, useState } from "react";
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
import { LabOrder, LabOrderTableRow } from "../UserTypes.js";
import { supabase, fetchProducerOrders } from "../Authentication.js";
import { Session } from "@supabase/supabase-js";
import LabOrderTable from "../labDashboard/LabOrderTable.js";
import ProducerDashboard from "./ProducerDashboard.js";
import PlaceNewOrder from "../producer/PlaceNewOrder.js";

interface SessionProps {
  session: Session | null;
}

export default function ProdPlaceOrder({ session }: SessionProps) {
  return (
    <ProducerDashboard>
      {<PlaceNewOrder session={session} />}
    </ProducerDashboard>
  );
}

// export default LabOrder;
