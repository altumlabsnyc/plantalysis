// import {User} from "@supabase/supabase-js"
// import {LabOrder, Brand} from "@/types/supabaseAlias"
// import {supabase} from '@/utils/supabase'
// import { v4 as uuidv4 } from "uuid";
// import {insertBrand} from "@/hooks/addBrand"

// import {createNewBatch} from "@/components/Authentication"
// import insertAndShowBrands from "@/hooks/addBrand"
// import useSWR, {mutate, useSWRConfig} from "swr"
// //TODO -> change

// export async function insertLabOrder(
//     labOrder: LabOrder,
//     user: User | null,
//     brands: Brand[],
//     brandId?: string, //TODO: changes when dropdown for brand
//     brandName?: string,
//   ) {
//     if (!user){
//         throw new Error("user must exist to add lab order");
//     }
//         const userId = user.id;
//         labOrder.lab_user_id = userId;
//       const orderId = uuidv4();
//       labOrder.id = orderId;
  


//       if (!brandId){ //handle creating new brand
//         if (!brandName){
//             throw new Error("Brands need to have a name");
//         }
//         brandId = uuidv4();
//         const newBrand: Brand = {id:brandId, image_path: null, name: brandName, producer_user_id: user.id, serving_size: null}
//         insertAndShowBrands({oldBrands: brands, newBrand:newBrand, user: user, newBrandId: brandId})
//       }
//       const batchId = await createNewBatch(brandId); //TODO addBatch SWR
//       labOrder.batch_id = batchId;
  
      
      

//       try {
//         const { data, error } = await supabase.from("lab_order").insert(labOrder);
//         if (error) {
//           throw new Error('Failed to add new lab order');
//         }
//         return data; // Assuming the response contains the updated data or success message
//       } catch (error) {
//         // Handle errors, such as network issues or server errors
//         throw new Error('Network/server error adding lab order');
//       }
//   }

//   export default async function insertAndShowLabOrders(data: {
//     oldLabOrders: LabOrder[] | null,
//     newLabOrder: LabOrder,
//     user: User | null,
//     brands: Brand[],
//     brandId?: string
//     brandName?: string
//   }) {

    
//     data.newLabOrder.id = uuidv4()
  
//     try {
//       await insertLabOrder(data.newLabOrder, data.user, data.brands,data.brandId, data.brandName)
  
//       // Update the cache with the new brand by using SWR's mutate function
//       if (data.oldLabOrders){
//       mutate(`/api/lab_orders/${data.user?.id}`, [...data.oldLabOrders, data.newLabOrder], false);
//       }
//       else{
//         throw new Error("unable to get lab orders of this user");
//       }
//     } catch (error) {
//       throw new Error("Failed to insert and show lab orders");
//     }
//   }


// export async function createNewBatch(brandId: string): Promise<string> {
//     const batchId = uuidv4();
//     const newBatch: Batch = {
//       brand_id: brandId,
//       facility_id: null, //TODO what should this be?
//       weight: null,
//       id: batchId,
//     };
//     await supabase.from("batch").insert(newBatch);
//     return batchId;
//   }
  
    
// HANDED BY STRIPE