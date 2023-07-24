import React, { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";

import { fetchAnalyzedOrders } from "../Authentication.js";
import { ForApproval, AnalysisTableRow, NOT_APPROVED } from "../UserTypes.js";
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


