// import { supabase } from "@/utils/supabase";
// import { RoleDataType } from "./useUserDetails";

// import { BaseUser, LabUser, RegulatorUser, ProducerUser, UniversityUser } from "@/types/supabaseAlias";


// export async function handleSignUp(
//     userData: BaseUser,
//     password: string,
//     RoleData: RoleDataType | undefined
//   ): Promise<void> {
//     try {
//       if (!userData.email){
//         throw new Error("Please provide a valid email")
//       }
//       //sign up
//       const {data: data, error: error} = await supabase.auth.signUp({
//         email: userData.email,
//         password: password,
//       });
  
//       // sign in
//       console.log("cual es el user?", await supabase.auth.getUser());
//       // ver si se necesita sign in tambien
//     //   const { data, error } = await supabase.auth.signInWithPassword({
//     //     email: userData.email,
//     //     password: password,
//     //   });
  
//       const user = data.user;
  
//       if (error) {
//         console.error(error);
//       } else {
//         const id = user?.id;
//         if (!id){
//             throw new Error("Could not get user ID");
//         }
//         userData.id = id;
//         await insertUser(userData);
  
//         if (labData) {
//           labData.id = id;
//           await supabase.from("lab_user").insert([labData]);
//         } else if (govData) {
//           govData.id = id;
//           await supabase.from("regulator_user").insert([govData]);
//         } else if (prodData) {
//           prodData.id = id;
//           await supabase.from("producer_user").insert([prodData]);
//         } else if (eduData) {
//           eduData.id = id;
//           const response = await supabase
//             .from("university_user")
//             .insert([eduData]);
//         }
//         window.location.href = "/login";
//       }
//     } catch (error) {
//       console.log("error inserting user", error);
//     }
//   }