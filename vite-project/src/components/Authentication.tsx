
// import { v4 as uuidv4 } from "uuid";
import { supabase } from '@/utils/supabase'
import { ForApproval, LabOrder } from './UserTypes'


export async function fetchAnalyzedOrders(): Promise<Array<ForApproval>> {
  const forApproval: Array<ForApproval> = []
  const allAnalyzed = await (
    await supabase.from('analysis').select('*').eq('regulator_approved', false)
  ).data
  if (allAnalyzed) {
    for (const analysis of allAnalyzed) {
      const analysisId = analysis.id
      const labOrderId = analysis.lab_order_id
      const correspondingOrder = await supabase
        .from('lab_order')
        .select('*')
        .eq('id', labOrderId)
        .single()
      const correspondingMolecules = await supabase
        .from('molecule_prediction')
        .select('*')
        .eq('analysis_id', analysisId)

      if (correspondingMolecules && correspondingOrder) {
        // const labName = (
        //   await supabase
        //     .from("lab_user")
        //     .select("legal_name")
        //     .eq("id", correspondingOrder.data?.lab_user_id)
        //     .single()
        // ).data; // uncomment once RLS is set
        const labName = correspondingOrder.data
          ? correspondingOrder.data.lab_user_id
          : 'temp lab name'

        const { data: brandId } = await supabase
          .from('batch')
          .select('brand_id')
          .eq('id', correspondingOrder.data?.batch_id)
          .single()
        const brandNameData = await supabase
          .from('brand')
          .select('name')
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

export async function claimNewOrders(orderIds: Array<string>): Promise<void> {
  const userId = (await supabase.auth.getUser()).data.user?.id

  if (userId) {
    for (const orderId of orderIds) {
      const { data, error } = await supabase
        .from('lab_order')
        .update({ lab_user_id: userId })
        .eq('id', orderId)
        .select()
      console.log({ data: data, error: error })
    }
  }
}

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
