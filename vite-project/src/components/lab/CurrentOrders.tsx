import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { fetchClaimedOrders } from "../Authentication.js";
import { LabOrder, LabOrderTableRow } from "../UserTypes.js";
import LabOrderTable from "./LabOrderTable.js";
import useLabOrders, { getUserClaimedOrders } from "@/hooks/useLabOrders.js";

export default function CurrentOrders() {
  const user = useUser();
  const allOrders = useLabOrders(user);

  const [labOrders, setLabOrders] = useState<Array<LabOrderTableRow>>([]);
  console.log(labOrders, allOrders, user?.id);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchOrders() {
      //TODO: fix dependent current order to all orders
      setLoading(true);
      if (user && allOrders.data) {
        setLabOrders(
          getUserClaimedOrders(allOrders.data, user).map(
            (t: LabOrder): LabOrderTableRow => {
              console.log(t);
              return { ...t, status: "Claimed" };
            }
          )
        );
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user]);

  return <LabOrderTable labOrders={labOrders} showClaimed={false} />;
}

// export default LabOrder;
