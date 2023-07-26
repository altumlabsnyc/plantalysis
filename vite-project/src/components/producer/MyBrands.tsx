import { User } from "@supabase/supabase-js";
import { useUser } from "@supabase/auth-helpers-react";
import insertAndShowBrands from "@/hooks/addBrand";
import useBrandsDetails from "@/hooks/useBrands";

export default function Brands() {
  const user = useUser();
  const brands = useBrandsDetails(user);
  console.log(brands);
  return <p>ALO</p>;
}
