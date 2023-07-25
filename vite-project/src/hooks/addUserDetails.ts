import { supabase } from "@/utils/supabase"
import { User } from "@supabase/supabase-js"
import useSWR, {mutate, useSWRConfig} from "swr"

import { BaseUser, LabUser, RegulatorUser, ConsumerUser, UniversityUser, ProducerUser } from "@/types/supabaseAlias";
import { v4 as uuidv4 } from "uuid";
import { RoleDataType, UserRoleDataType } from "./useUserDetails";
import { AllRolesData } from "./handleSignUp";

export const insertUserDetails = async (userData: {userDetails: BaseUser, roleData: AllRolesData}) => {
    try {
        const { data, error } = await supabase.from("user").insert([userData.userDetails]);
        if (error) {
            throw new Error('Failed to add new base user');
        }
        const id = userData.userDetails.id;

        
        if (userData.roleData.labData) {
            userData.roleData.labData.id = id;
            await supabase.from("lab_user").insert([userData.roleData.labData]);
          } else if (userData.roleData.regulatorData) {
            userData.roleData.regulatorData.id = id;
            await supabase.from("regulator_user").insert([userData.roleData.regulatorData]);
          } else if (userData.roleData.producerData) {
            userData.roleData.producerData.id = id;
            await supabase.from("producer_user").insert([userData.roleData.producerData]);
          } else if (userData.roleData.universityData) {
            userData.roleData.universityData.id = id;
            const response = await supabase
              .from("university_user")
              .insert([userData.roleData.universityData]);
          }

      return data; // Assuming the response contains the updated data or success message
    } catch (error) {
      // Handle errors, such as network issues or server errors
      throw new Error('Network/server error adding brand');
    }
  };


  // IF NEEDED HANDLE MUTATION USERS CACHE
//   export default async function insertAndShowUsersDetails(data: {
//     oldBrands: [] | null;
//     newBrand: Brand;
//     user: User | null
//   }) {
//     const newBrandId = uuidv4();
//     data.newBrand.id = newBrandId;
//     // const user = useUser();
  
//     try {
//       await insertBrand(data.newBrand);
  
//       // Update the cache with the new brand by using SWR's mutate function
//       if (data.oldBrands){
//       mutate(`/api/brands/${data.user?.id}`, [...data.oldBrands, data.newBrand], false);
//       }
//       else{
//         throw new Error("unable to get brands of this user");
//       }
//     } catch (error) {
//       throw new Error("Failed to insert and show brands");
//     }
//   }
