import { LabOrder, TestCategory, TestResult, Analysis, RegulatorReview, TestRequirement} from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'
import useSWR from 'swr'

import toast from 'react-hot-toast'
import { RegulatorAnalysisTableRow } from '@/components/regulatorDashboard/ApproveOrders'

export enum ANALYSIS_REQUEST_TYPE {
  ALL,
  APPROVED,
  UNAPPROVED
}

export type TestResultAndReq ={
  analysis_id: string;
  id: string;
  result: string;
  test_requirement_id: string;
  test_requirement: TestRequirement | null;
}

export type ForApproval = {
  lab_name: string | null | undefined,
  producer_name: string | null | undefined,
  test_category: string| null | undefined,
  sku: string | null
  analysis_id: string
  finished_at: string | null
  tests: Array<TestResultAndReq> | null
}

export function useAnalysis(
// <<<<<<< HEAD
//   user: User | null,
//   requestType: ANALYSIS_REQUEST_TYPE | null
// ) {
//   const fetcher = async () => {

//     const { data, error } = await ((res) => {
//       switch (requestType) {
//         case ANALYSIS_REQUEST_TYPE.APPROVED:
//           return res.not('regulator_review', 'is', null)
//         case ANALYSIS_REQUEST_TYPE.UNAPPROVED:
//           return res.is('regulator_review', null)
//         default:
//           return res
//       }
//     })(
//       supabase
//         .from('analysis')
//         .select(`
//       *,
//       regulator_review (
//         approved
//       ),
//       lab_order (
//         lab_user (
//           lab_name
//         ),
//         batch (
//           producer_user (
//             common_name
//           )
//         )
//       )
//     `)
//     )

//     if (error) {
//       toast.error('Error fetching analysis. Please contact Altum Labs Support.')
//       throw new Error('error fetching analysis data')
//     }

//     if (!data) {
//       throw new Error('no data returned by fetch to analysis')
//     }

//     return data
//   }

//   const { data, error, isLoading } = useSWR(
//     user ? [`/api/analysis/${user.id}`, requestType] : null,
//     fetcher
// =======
) {
  const fetcher = async () => {

    let analysisData: Array<Analysis> | null;
    let analysisError: any;
    let reviewData: Array<RegulatorReview> | null;
    let reviewError: any;

    const analysisPromise = supabase
      .from('analysis')
      .select('*').then(({data, error})=>{
        analysisData = data;
        analysisError = error;
      })

    const reviewedPromise = supabase.from("regulator_review").select('*').then(({data, error})=>{
      reviewData = data;
      reviewError = error;
    })

    await Promise.all([analysisPromise, reviewedPromise]);

    const error = analysisError || reviewError

    if (error) {
      toast.error(
        'Error fetching analysis and/or review data. Please contact Altum Labs Support.',
      )
      throw new Error('unable to fetch analysis data')
    }
    

    //@ts-ignore
    if (!analysisData || !reviewData){
      toast.error(
        'Error fetching analysis data'
      )
      throw new Error("unable to fetch analysis data")
    }
    

    const reviewedIdSet = new Set(reviewData.map((review)=>{
      return review.analysis_id
    }))
    const notReviewedAnalysis = analysisData.filter((analysis)=>{
      return !reviewedIdSet.has(analysis.id)
    })

    const labOrderDataArray: Array<ForApproval> = [];
    const allLabOrderDataPromise: Array<Promise<void>> = [];
    for (const analysis of notReviewedAnalysis){
      const newPromise = supabase.from('lab_order').select(
        `
        *,
        batch (
          producer_user(
            legal_name
          )
        ),
        lab_user (
          lab_name
        )`
      ).eq('id', analysis.lab_order_id).single().then(({data, error})=>{
        if (data){
          const column: ForApproval ={
            analysis_id: analysis.id,
            lab_name: data.lab_user?.lab_name,
            producer_name: data.batch?.producer_user?.legal_name,
            sku: analysis.lab_order_id,
            tests: null,
            test_category: null,
            finished_at: analysis.finished_at
          }
          labOrderDataArray.push(column);
        }
        else{
          toast.error('Error fetching the data of an analysis');
        }

      })
      allLabOrderDataPromise.push(newPromise as Promise<void>);
    }

    await Promise.all(allLabOrderDataPromise);


    
    const missingDataPromises: Array<Promise<void>> = []
    for (const incompleteApproval of labOrderDataArray){
      const testCategoryPromise = supabase.from('lab_order_on_test')
      .select(`
      test (
        test_category_name
      )`).eq('lab_order_id', incompleteApproval.sku).single().then(({data, error})=>{
        if (data){
        incompleteApproval.test_category = data.test?.test_category_name
        }
        else{
          toast.error("error fetching test categories")
          //most likely reaches this point if there is no associated requirements because .single() does not work
        }
      })
      missingDataPromises.push(testCategoryPromise as Promise<void>);
      
      const testResultsPromise = supabase
      .from('test_result')
      .select(`
      *,
      test_requirement(
        *
      )`).eq('analysis_id', incompleteApproval.analysis_id)
      .then(({data, error})=>{
        if (data){
          incompleteApproval.tests = data
        }
        else{
          toast.error('error fetching test results');
        }
      })
      missingDataPromises.push(testResultsPromise as Promise<void>);
    }

    await Promise.all(missingDataPromises);




    return labOrderDataArray;
  }

  const { data, error, isLoading } = useSWR(
    `/api/analysis`,
    fetcher,
  )

  return {
    data: data ? data : [],
    error,
    isLoading
  }
}

// export function useAnalysis(
//   user: User | null,
//   allLabOrders: LabOrder[] | null,
// ) {
//   const fetcher = async () => {
//     const forApproval: Array<ForApproval> = []
//     const { data: allAnalysisData, error: error } = await supabase
//       .from('analysis')
//       .select('*')
//       .eq('regulator_approved', false)

//     if (error || !allAnalysisData) {
//       console.log(error)
//       toast.error(
//         'Error fetching analysis data. Please contact Altum Labs Support.',
//       )
//       throw new Error('unable to fetch analysis data')
//     }

//     for (const analysis of allAnalysisData) {
//       const analysisId = analysis.id
//       const labOrderId = analysis.lab_order_id
//       let correspondingOrder: LabOrder
//       if (allLabOrders) {
//         const correspondingOrder = allLabOrders.filter((order) => {
//           return order.id === labOrderId
//         })[0]

//         const correspondingMolecules = await supabase
//           .from('molecule_prediction')
//           .select('*')
//           .eq('analysis_id', analysisId)

//         if (correspondingMolecules) {
//           const labName = correspondingOrder.lab_user_id

//           const { data: brandId } = await supabase
//             .from('batch')
//             .select('brand_id')
//             .eq('id', correspondingOrder.batch_id)
//             .single()
//           const brandNameData = await supabase
//             .from('brand')
//             .select('name')
//             // @ts-ignore
//             .eq('id', brandId?.brand_id)
//             .single()
//           const brandName = brandNameData.data
//           if (brandName) {
//             const newApproved: ForApproval = {
//               lab_name: labName,
//               brand_name: brandName.name,
//               pass: true,
//               molecules: correspondingMolecules.data,
//               sku: 'qr.plantalysis.com/' + labOrderId,
//               analysis_id: analysisId,
//             }
//             forApproval.push(newApproved)
//           }
//         }
//       }
//     }
//     return forApproval
//   }

//   const { data, error, isLoading } = useSWR(
//     user ? `/api/analysis/` : null,
//     fetcher,
//   )

//   return {
//     data: data as ForApproval[] | null,
//     error,
//     isLoading,
//   }
// }
