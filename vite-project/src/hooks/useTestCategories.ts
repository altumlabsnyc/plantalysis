import { TestCategory } from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'
import useSWR from 'swr'

import toast from 'react-hot-toast'

//   const user = useUser();

/**
 * SWR hook that fetches existing test categories that a producer can choose their order is

 * @returns {data, error, isLoading} data is an object with all the test categories. error is the error object from SWR.
 */
export default function useTestCategoriesDetails(onlyEnabled?: boolean) {
  const fetcher = async () => {
    let categoryError: any, categoryData: Array<TestCategory> | null

    const categoriesFetchPromise = supabase
      .from('test_category')
      .select('*')
      .then(({ data, error }) => {
        categoryData = data
        categoryError = error
      })

    await categoriesFetchPromise

    if (categoryError) {
      console.log(categoryError)
      toast.error(
        'Error fetching test categories. Please contact Altum Labs Support.',
      )
    }

    // if (error) throw error

    // @ts-ignore
    if (!categoryData) {
      return null
    }

    // Return the combined data
    return categoryData
  }

  const { data, error, isLoading, mutate } = useSWR(
    `/api/test_categories`,
    fetcher,
  )

  return {
    data:
      (data && onlyEnabled && data.filter((c) => c.enabled)) ||
      (data as TestCategory[] | null),
    error,
    isLoading,
    mutate,
  }
}
