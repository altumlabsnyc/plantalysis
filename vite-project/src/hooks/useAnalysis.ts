import { LabOrder, TestCategory, TestResult, Analysis, RegulatorReview, TestRequirement} from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'
import useSWR from 'swr'

import toast from 'react-hot-toast'

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
  tests: Array<TestResultAndReq> | null
}

export function useAnalysis(
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
            test_category: null
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
    data: data as ForApproval[] | null,
    error,
    isLoading,
  }
}
