import React, { useState, useEffect } from "react";
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
import Regulator from "./Regulator.js";
import { Session } from "@supabase/supabase-js";

import { fetchAnalyzedOrders } from "../Authentication.js";
import { LabOrder, Analysis, ForApproval, AnalysisTableRow, NOT_APPROVED } from "../UserTypes.js";
import AnalysisTable from "./AnalysisTable.js";

interface SessionProps {
  session: Session | null;
}

export default function ApproveOrders({ session }: SessionProps) {
  const [analysis, setAnalysis] = useState<Array<AnalysisTableRow>>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchAnalysis() {
      setLoading(true);
      if (session) {
        setAnalysis(
          (await fetchAnalyzedOrders()).map(
            (t: ForApproval): AnalysisTableRow => {
              return { ...t, status: NOT_APPROVED }
            }
          )
        );
        setLoading(false);
      }
    }

    fetchAnalysis();
  }, [session]);

  return (
    <AnalysisTable analysis={analysis} />
  );
}


