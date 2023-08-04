import { supabase } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'

import toast from 'react-hot-toast'
import { KeyedMutator } from 'swr'

export const claimLabOrder = async (
  user: User | null,
  claimFacilityId: string,
  lab_order_id: string,
  mutate: KeyedMutator<any>,
) => {
  try {
    const { data, error } = await supabase
      .from('lab_order')
      .update({ lab_facility_id: claimFacilityId })
      .eq('id', lab_order_id)
    // .select()
    if (error) {
      throw new Error('Failed to claim lab order')
    }
    await mutate()
    toast.success('Order claimed! See overview for live tracking.')
    return data // Assuming the response contains the updated data or success message
  } catch (error) {
    // Handle errors, such as network issues or server errors
    toast.error('Error claiming order. Please contact Altum Labs Support.')
  }
}
