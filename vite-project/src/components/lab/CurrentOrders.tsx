import React, { useEffect, useState } from "react";
import { LabOrder, LabOrderTableRow } from "../UserTypes.js";
import { supabase, fetchClaimedOrders } from "../Authentication.js";
import { Session } from "@supabase/supabase-js";
import LabOrderTable from "./LabOrderTable.js";

interface SessionProps {
  session: Session | null;
}

export default function CurrentOrders({ session }: SessionProps) {
  const [labOrders, setLabOrders] = useState<Array<LabOrderTableRow>>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      if (session) {
        setLabOrders(
          (await fetchClaimedOrders()).map((t: LabOrder): LabOrderTableRow => {
            return { ...t, status: "Claimed" };
          })
        );
        setLoading(false);
      }
    }

    fetchOrders();
  }, [session]);

  return (
    <LabOrderTable labOrders={labOrders} showClaimed={false} />
  );
}

// export default LabOrder;
