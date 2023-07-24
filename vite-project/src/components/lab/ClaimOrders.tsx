import React, { useEffect, useState } from "react";
import { LabOrder, LabOrderTableRow, NOT_CLAIMED } from "../UserTypes.js";
import { supabase, fetchUnclaimedOrders } from "../Authentication.js";
import { Session } from "@supabase/supabase-js";
import LabOrderTable from "./LabOrderTable.js";

interface SessionProps {
  session: Session | null;
}

export default function ClaimOrders({ session }: SessionProps) {
  const [labOrders, setLabOrders] = useState<Array<LabOrderTableRow>>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      if (session) {
        setLabOrders(
          (await fetchUnclaimedOrders()).map(
            (t: LabOrder): LabOrderTableRow => {
              return { ...t, status: "Not Claimed" };
            }
          )
        );
        // console.log('aaaaaaaaaa')
        // console.log(temp)
        setLoading(false);
      }
    }

    fetchOrders();
  }, [session]);

  return (

    <LabOrderTable labOrders={labOrders} showClaimed={true} />
  );
}

// export default LabOrder;
