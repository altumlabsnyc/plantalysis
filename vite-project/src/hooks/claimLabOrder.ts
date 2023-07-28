import { supabase } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'
import { mutate } from 'swr'

import { LabOrder } from '@/types/supabaseAlias'
import { LabOrdersRequested } from './useLabOrders'

export const claimLabOrders = async (orderIds: Array<string>, user: User | null) => {
    for (const orderId of orderIds){
        try {
            const { data, error } = await supabase
            .from('lab_order')
            .update({ lab_user_id: user?.id })
            .eq('id', orderId)
            .select()
            if (error) {
              throw new Error('Failed to claim lab order')
            }
            return data // Assuming the response contains the updated data or success message
          } catch (error) {
            // Handle errors, such as network issues or server errors
            throw new Error('Network/server error claiming lab order')
          }

    }
  
}

export default async function claimAndShowLabOrders(data: {
  unclaimedLabOrders: LabOrder[] | null
  toClaimedOrderIds: string[]
  claimedByUser: LabOrder[]
  user: User | null
}) {

  try {
    await claimLabOrders(data.toClaimedOrderIds, data.user);

    // Update the cache with the new brand by using SWR's mutate function
    if (data.unclaimedLabOrders) {
      mutate(
        `/api/lab_order/${LabOrdersRequested.unClaimedByLab}/${data.user?.id}`,
        data.unclaimedLabOrders.filter((order)=>{
            return data.toClaimedOrderIds.reduce((prevVal:boolean, currVal: string) => prevVal && currVal !== order.id, true)
        }),
        false,
      )
    } else {
      throw new Error('unable to claim lab orders')
    }
  } catch (error) {
    throw new Error('Failed to insert and show lab orders')
  }
  return data // Assuming the response contains the updated data or success message
}
