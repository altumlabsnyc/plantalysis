import { LabOrder, MoleculePredict } from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'
import useSWR from 'swr'

import toast from 'react-hot-toast'

export type ForApproval = {
  lab_name: string | null
  brand_name: string | null
  molecules: Array<MoleculePredict> | null
  pass: boolean
  sku: string | null
  analysis_id: string
}

export function useAnalysis(
  user: User | null,
  allLabOrders: LabOrder[] | null,
) {
  const fetcher = async () => {
    const forApproval: Array<ForApproval> = []
    const { data: allAnalysisData, error: error } = await supabase
      .from('analysis')
      .select('*')
      .eq('regulator_approved', false)

    if (error || !allAnalysisData) {
      console.log(error)
      toast.error('Error fetching analysis data. Please contact Altum Labs Support.')
      throw new Error('unable to fetch analysis data')
    }

    for (const analysis of allAnalysisData) {
      const analysisId = analysis.id
      const labOrderId = analysis.lab_order_id
      let correspondingOrder: LabOrder
      if (allLabOrders) {
        const correspondingOrder = allLabOrders.filter((order) => {
          return order.id === labOrderId
        })[0]

        const correspondingMolecules = await supabase
          .from('molecule_prediction')
          .select('*')
          .eq('analysis_id', analysisId)

        if (correspondingMolecules) {
          const labName = correspondingOrder.lab_user_id

          const { data: brandId } = await supabase
            .from('batch')
            .select('brand_id')
            .eq('id', correspondingOrder.batch_id)
            .single()
          const brandNameData = await supabase
            .from('brand')
            .select('name')
            // @ts-ignore
            .eq('id', brandId?.brand_id)
            .single()
          const brandName = brandNameData.data
          if (brandName) {
            const newApproved: ForApproval = {
              lab_name: labName,
              brand_name: brandName.name,
              pass: true,
              molecules: correspondingMolecules.data,
              sku: 'qr.plantalysis.com/' + labOrderId,
              analysis_id: analysisId,
            }
            forApproval.push(newApproved)
          }
        }
      }
    }
    return forApproval
  }

  const { data, error, isLoading } = useSWR(
    user ? `/api/analysis/` : null,
    fetcher,
  )

  return {
    data: data as ForApproval[] | null,
    error,
    isLoading,
  }
}
