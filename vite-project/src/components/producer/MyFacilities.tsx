import { User } from "@supabase/supabase-js";
import { useUser } from "@supabase/auth-helpers-react";
import insertAndShowFacilities from "@/hooks/addFacility";
import useFacilitiesDetails from "@/hooks/useFacilities";
import GeneralForm from "../GeneralForm";
import { facilityInputs } from "../UserTypes";
import { Facility } from "@/types/supabaseAlias";
import { FormEvent } from "react";

export default function Brands() {
  const user = useUser();
  const facilities = useFacilitiesDetails(user);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const facilityName = formData.get("facility_name")?.toString();
    const address = formData.get("address")?.toString();
    const description = formData.get("description")?.toString() || null;
    const id = "";
    const userId = user?.id;

    if (!facilityName || !address || !userId) {
      throw new Error("please provide a valid brand name and be a valid user");
    }
    const newBrand: Facility = {
      name: facilityName,
      id: "",
      producer_id: userId,
      description: description,
      location: address,
    };
    return newBrand;
  }
  const insertFacility = (newFacility: Facility, oldFacilities: Facility[]) => {
    insertAndShowFacilities({
      oldFacilities: oldFacilities,
      newFacility: newFacility,
      user: user,
    });
  };

  if (facilities.data) {
    return (
      <div>
        {facilities.data.map((facility) => (
          <p>{facility.name}</p>
        ))}
        <GeneralForm<Facility>
          inputs={facilityInputs}
          oldT={facilities.data}
          createT={handleSubmit}
          insertT={insertFacility}
        ></GeneralForm>
      </div>
    );
  } else if (facilities.isLoading) {
    return <p>Loading...</p>;
  }
}
