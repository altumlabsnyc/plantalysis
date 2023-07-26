import { User } from "@supabase/supabase-js";
import { useUser } from "@supabase/auth-helpers-react";
import insertAndShowFacilities from "@/hooks/addFacility";
import useFacilitiesDetails from "@/hooks/useFacilities";

export default function Facilities() {
  const user = useUser();
  const facilities = useFacilitiesDetails(user);
  console.log(facilities);
  return <p>ALO</p>;
}
