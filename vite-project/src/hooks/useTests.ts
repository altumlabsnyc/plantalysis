import { Test, TestCategory, TestRequirement } from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'
import useSWR from 'swr'

import toast from 'react-hot-toast'

export type TestWithLocalRequirements = Test & {
  test_requirements: TestRequirement[]
}

/**
 * SWR hook that fetches existing tests for a given category
 * @param category teting category of which tests will be fetched
 * @param onlyEnabled if true, only enabled tests will be fetched
 * @param state if provided, only tests that are required in the given state will be fetched
 *
 * @returns {data, error, isLoading} data is an object with all the tests of the category. error is the error object from SWR.
 */
export default function useTestDetails(
  category: TestCategory,
  onlyEnabled?: boolean,
  state?: string | null,
) {
  const fetcher = async () => {
    let testError: any, testData: Array<Test> | null

    let testsFetchPromise

    if (state) {
      testsFetchPromise = supabase
        .from('test')
        .select(
          `
        *,
        test_requirements:test_requirement!inner ( * )
      `,
        )
        .eq('test_category_name', category.name)
        .eq('test_requirement.state_code', state)
        .then(({ data, error }) => {
          testData = data
          testError = error
        })
    } else {
      testsFetchPromise = supabase
        .from('test')
        .select(
          `
        *,
        test_requirements:test_requirement ( * )
      `,
        )
        .eq('test_category_name', category.name)
        .then(({ data, error }) => {
          testData = data
          testError = error
        })
    }

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
    `/api/tests/${category.name}/${state || ''}`,
    fetcher,
  )

  return {
    data:
      (data &&
        onlyEnabled &&
        (data.filter((t) => t.enabled) as TestWithLocalRequirements[])) ||
      (data as TestWithLocalRequirements[] | null),
    error,
    isLoading,
    mutate,
  }
}
