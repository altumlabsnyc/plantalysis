
import { supabase } from "@/utils/supabase"
import { User } from "@supabase/supabase-js"
import useSWR from "swr"
import { LabOrder } from "@/types/supabaseAlias";

export enum LabOrdersRequested{
  claimedByALab,
  unClaimedByLab,
  ofAProducer,
  allOrders
}



/**
 * SWR hook that fetches all lab orders from Supabase. Returns all lab order details.
 *
 * @param user supabase user object
 * @returns {data, error, isLoading} data is null if user is null, otherwise it is
 * an object with userDetails and roleDetails. error is the error object from SWR.
 */
export default function useLabOrders(user: User | null, requested: LabOrdersRequested) {
  const fetcher = async () => {

    const {data: data, error: error} = await supabase
      .from("lab_order")
      .select("*")


    if (error){
      console.log(error)
      throw new Error("error retrieving lab_order data")
    }


    if (!data) {
      throw new Error('no data returned by fetch to lab_orders')
    }

    return data;
  }

  const { data, error, isLoading } = useSWR(
    user ? `/api/lab_order/` : null,
    fetcher
  )
let fetchingFunction = (allOrders: LabOrder[] | undefined, user: User | null): LabOrder[] =>{
  return allOrders? allOrders: []
};
  
  switch(requested){
    case LabOrdersRequested.allOrders:
      fetchingFunction = getAllOrders
      break;
    case LabOrdersRequested.claimedByALab:
      fetchingFunction = getUserClaimedOrders
      break;
    case LabOrdersRequested.unClaimedByLab:
      fetchingFunction = getUnClaimedOrders
      break;
    case LabOrdersRequested.ofAProducer:
      fetchingFunction = getProducerOrders;
      break;
    default:
      throw new Error("Please provide a valid type of fetch for lab orders");
  }

  const filteredData = fetchingFunction(data, user)
  
  return {
    data: filteredData as LabOrder[] | null,
    error,
    isLoading,
  }
}


//HELPERS FOR LAB_ORDERS FETCHING

/**
 * Fetches claimed orders by a specific lab user
 * @param allOrders : all lab_orders in file
 * @param user expects user.user_type to be "lab"
 * 
 * @returns the list of the lab orders that belong to that specific user
 */
export function getUserClaimedOrders(allOrders: LabOrder[] | undefined, user: User|null): Array<LabOrder>{
  if (allOrders){
    const claimedOrders = allOrders.filter((order)=>{
        return order.lab_user_id === user?.id
    })
    return claimedOrders
  }
  return [];
}

/**
 * Fetches unclaimed orders
 * @param allOrders : all lab_orders in file
 * 
 * @returns the list of the lab orders that dont have an assigned lab user
 */
export function getUnClaimedOrders(allOrders: LabOrder[] | undefined, user: User | null): Array<LabOrder>{
  if (allOrders){
    const unclaimedOrders = allOrders.filter((order)=>{
        return order.lab_user_id === null
    })
    return unclaimedOrders
  }
  return []
}

export function getAllOrders(allOrders: LabOrder[] | undefined, user: User | null): Array<LabOrder>{
  return allOrders? allOrders: [];
}

export function getProducerOrders(allOrders: LabOrder[] | undefined, user: User | null): Array<LabOrder>{
  // todo: UPDATE THIS FUNCTION
  return allOrders? allOrders: [];
}



