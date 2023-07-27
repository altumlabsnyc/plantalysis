// import { v4 as uuidv4 } from "uuid";
import { supabase } from '@/utils/supabase'
import { LabOrder } from './UserTypes'

export async function approveOrders(analysisIds: Array<string>): Promise<void> {
  for (const analysisId of analysisIds) {
    await supabase
      .from('analysis')
      .update({ regulator_approved: true })
      .eq('id', analysisId)
  }
}

export async function fetchProducerOrders(): Promise<Array<LabOrder>> {
  const allLabOrders: Array<LabOrder> = []
  const userId = (await supabase.auth.getUser()).data.user?.id

  const brandIds = (
    await supabase.from('brand').select('id').eq('producer_user_id', userId)
  ).data
  const allBatchIds: Array<string> = []
  if (brandIds) {
    for (const brandId of brandIds) {
      // const batchIdsOfBrand = (
      //   await supabase.from("batch").select("id").eq("brand_id", brandId)
      // ).data;
      const response = await supabase.from('batch').select('*')
      if (response.data) {
        for (const batch of response.data) {
          if (batch.brand_id == brandId.id) {
            allBatchIds.push(batch.id)
          }
        }
      }
    }

    for (const batchId of allBatchIds) {
      const labOrders: LabOrder[] | null = (
        await supabase.from('lab_order').select('*').eq('batch_id', batchId)
      ).data
      if (labOrders && labOrders[0]) {
        allLabOrders.push(labOrders[0])
      }
    }
  }
  return allLabOrders
}
