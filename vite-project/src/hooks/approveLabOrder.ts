import { supabase } from '@/utils/supabase'
import { User } from '@supabase/auth-helpers-react'

import toast from 'react-hot-toast'

export const approveLabOrder = async (
  labOrderId: string,
  user: User | null,
) => {
  try {
    if (!user) {
      throw new Error('No permission')
    }
    const { data, error } = await supabase
      .from('lab_order')
      .update({ lab_user_id: user.id })

      .eq('id', labOrderId)
    if (error) {
      throw new Error('Failed to approve order')
    }
    return data
  } catch (error) {
    toast.error('Error approving order. Please contact Altum Labs Support.')
    throw new Error('Network/Server error approving lab order')
  }
}
