import {
  Analysis,
  RegulatorReview,
  TestRequirement,
  TestResult,
  Test,
} from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'
import useSWR from 'swr'

import toast from 'react-hot-toast'

export enum ANALYSIS_REQUEST_TYPE {
  ALL,
  APPROVED,
  UNAPPROVED,
}

export type ForApproval = {
  lab_order_id: string | null
  lab_name: string | null | undefined
  producer_name: string | null | undefined
  sku: string | null
  analysis_id: string | null
  finished_at: string | undefined
  tests: Array<{
    test: Test
    reqResults: Array<{ result: TestResult; requirement: TestRequirement }>
  }> | null
}

export function useAnalysis(state: string) {
  const fetcher = async () => {
    let analysisData: Array<ForApproval> | null = []
    let analysisError: any

    const alexBigQuery = supabase
      .from('lab_order')
      .select(
        ` *,
      batch!inner (
        *,
        producer_user(
          legal_name
        ),
        producer_facility!inner(
          *,
          address!inner(
            state_code
          )
        )
      ),
      lab_facility (
        lab_user(
          lab_name
        )
        ),
      analysis!inner (
        *,
        regulator_review_id
        ),
      lab_order_on_test ( *, 
        test ( *, 
          test_requirement ( *,
            test_result ( * )
          )
        )
      )
      `,
      )
      .is('analysis.regulator_review_id', null)
      .eq('batch.producer_facility.address.state_code', state)
      .then(({ data, error }) => {
        console.log(data)
        if (data) {
          analysisData = data.map((order) => {
            const tests: Array<{
              test: Test
              reqResults: Array<{
                result: TestResult
                requirement: TestRequirement
              }>
            }> = order.lab_order_on_test.map((testPreprocessed) => {
              if (testPreprocessed.test) {
                const test: Test = {
                  enabled: testPreprocessed.test?.enabled,
                  test_category_name: testPreprocessed.test?.test_category_name,
                  id: testPreprocessed.test.id,
                  name: testPreprocessed.test.name,
                }
                const reqResultPairs: Array<{
                  result: TestResult
                  requirement: TestRequirement
                }> = testPreprocessed.test.test_requirement.map(
                  (reqPreProcessed) => {
                    const req: TestRequirement = {
                      country_code: reqPreProcessed.country_code,
                      name: reqPreProcessed.name,
                      id: reqPreProcessed.id,
                      description: reqPreProcessed.description,
                      type: reqPreProcessed.type,
                      test_id: reqPreProcessed.test_id,
                      state_code: reqPreProcessed.state_code,
                    }
                    if (reqPreProcessed.test_result.length === 0) {
                      // toast.error(
                      //   'no result associated with a mandatory requirement. Please contact Altum support',
                      // )
                      // throw new Error(
                      //   'every requirement needs to be associated for a result in a given analysis',
                      // )
                    }
                    const result = reqPreProcessed.test_result[0]
                    return { requirement: req, result: result }
                  },
                )
                return { test: test, reqResults: reqResultPairs }
              } else {
                throw new Error('tests should be defined for a given lab order')
              }
            })

            const toApprove: ForApproval = {
              lab_order_id: order.id,
              analysis_id: order.analysis_id,
              sku: order.id,
              lab_name: order.lab_facility?.lab_user?.lab_name,
              producer_name: order.batch?.producer_user?.legal_name,
              finished_at: order.analysis?.finished_at,
              tests: tests,
            }
            return toApprove
          })
          analysisError = error
        } else {
          console.log(error)
          toast.error('error fetching the data for regulator approval')
          throw new Error('error in fetching data for regulator approval')
        }
      })

    await alexBigQuery

    if (analysisError) {
      toast.error(
        'Error fetching data from analyzed orders. Please contact Altum Labs Support.',
      )
      throw new Error('unable to fetch analysis data')
    }

    //@ts-ignore
    if (!analysisData) {
      toast.error('Error fetching analysis data')
      throw new Error('unable to fetch analysis data')
    }

    return analysisData
  }

  const { data, error, isLoading } = useSWR(`/api/analysis/${state}`, fetcher)

  return {
    data: data ? data : [],
    error,
    isLoading,
  }
}
