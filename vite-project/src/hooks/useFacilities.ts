import { Facility } from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'
import useSWR from 'swr'

import toast from 'react-hot-toast'

//   const user = useUser();

/**
 * SWR hook that fetches facilities of a specific user from Supabase. Returns all facility details.
 *
 * @param user supabase user object
 * @returns {data, error, isLoading} data is null if user is null, otherwise it is
 * an object with userDetails and roleDetails. error is the error object from SWR.
 */
export default function useFacilitiesDetails(user: User | null) {
  const fetcher = async () => {
    let facilityError: any, facilityData: Array<Facility> | null

    const facilityFetchPromise = supabase
      .from('producer_facility')
      .select('*')
      .eq('producer_user_id', user?.id)
      .then(({ data, error }) => {
        facilityData = data
        facilityError = error
      })

    await facilityFetchPromise

    if (facilityError) {
      console.log(facilityError)
      toast.error(
        'Error fetching facilities. Please contact Altum Labs Support.',
      )
    }

    // if (error) throw error

    // @ts-ignore
    if (!facilityData) {
      return null
    }

    // Return the combined data
    return facilityData
  }

  const { data, error, isLoading, mutate } = useSWR(
    user ? `/api/facilities/${user.id}` : null,
    fetcher,
  )

  return {
    data: data as Facility[] | null,
    error,
    isLoading,
    mutate,
  }
}
