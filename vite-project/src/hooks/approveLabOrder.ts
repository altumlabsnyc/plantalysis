import { supabase } from '@/utils/supabase'
import { User } from '@supabase/auth-helpers-react'
import { v4 as uuidv4 } from 'uuid'

import toast from 'react-hot-toast'

import { mutate } from 'swr'
import useUserDetails, { RegulatorWithAddress } from './useUserDetails'
import { ForApproval } from './useAnalysis'

export const approveLabOrder = async (
  analysisId: string,
  user: User | null,
  oldData: ForApproval[],
  state: string,
) => {
  try {
    if (!user) {
      throw new Error('No permission')
    }
    const regulatorReviewId = uuidv4()
    await (async () => {
      const { error } = await supabase.from('regulator_review').insert({
        id: regulatorReviewId,
        regulator_user_id: user.id,
        approved: true,
      })
      if (error) {
        throw new Error('failed to create new regulator_review')
      }
    })()

    const { data, error } = await supabase
      .from('analysis')
      .update({ regulator_review_id: regulatorReviewId })
      .eq('id', analysisId)

    if (error) {
      throw new Error('Failed to approve order')
    }

    // update local cache
    if (state) {
      mutate(
        `/api/analysis/${state}`,
        oldData.filter(({ analysis_id }) => analysis_id != analysisId),
        false,
      )
    }
    return data
  } catch (error) {
    toast.error('Error approving analysis. Please contact Altum Labs Support.')
    throw new Error('Network/Server error approving lab order')
  }
}
