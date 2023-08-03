import { Test, TestCategory } from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'
import useSWR from 'swr'

import toast from 'react-hot-toast'


/**
 * SWR hook that fetches existing tests for a given category
 * @param category teting category of which tests will be fetched
 * @returns {data, error, isLoading} data is an object with all the tests of the category. error is the error object from SWR.
 */
export default function useTestDetails(category: TestCategory) {
  const fetcher = async () => {
    let testError: any, testData: Array<Test> | null

    const testsFetchPromise = supabase
      .from('test')
      .select('*').eq('test_category_name', category.name).then(({ data, error }) => {
        testData = data
        testError = error
      })
     

    await testsFetchPromise

    if (testError) {
      console.log(testError)
      toast.error(
        `Error fetching tests for ${category.name}. Please contact Altum Labs Support.`,
      )
    }

    // if (error) throw error

    // @ts-ignore
    if (!testData) {
      return null
    }

    // Return the combined data
    return testData
  }

  const { data, error, isLoading, mutate } = useSWR(
    `/api/tests/${category.name}`,
    fetcher,
  )

  return {
    data: data as Test[] | null,
    error,
    isLoading,
    mutate,
  }
}
