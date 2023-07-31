import { Brand } from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'
import useSWR from 'swr'

import toast from 'react-hot-toast'

//   const user = useUser();

/**
 * SWR hook that fetches brands of a specific user from Supabase. Returns all brand details.
 *
 * @param user supabase user object
 * @returns {data, error, isLoading} data is null if user is null, otherwise it is
 * an object with userDetails and roleDetails. error is the error object from SWR.
 */
export default function useBrandsDetails(user: User | null) {
  const fetcher = async () => {
    let brandError: any, brandData: Array<Brand> | null

    const brandsFetchPromise = supabase
      .from('brand')
      .select('*')
      .eq('producer_user_id', user?.id)
      .then(({ data, error }) => {
        brandData = data
        brandError = error
      })

    await brandsFetchPromise

    if (brandError) {
      console.log(brandError)
      toast.error('Error fetching brands. Please contact Altum Labs Support.')
    }

    // @ts-ignore
    if (!brandData) {
      return null
    }

    // Return the combined data
    return brandData
  }

  const { data, error, isLoading } = useSWR(
    user ? `/api/brands/${user.id}` : null,
    fetcher,
  )

  return {
    data: data as Brand[] | null,
    error,
    isLoading,
  }
}
