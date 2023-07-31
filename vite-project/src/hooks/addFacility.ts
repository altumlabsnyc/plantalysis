import { supabase } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'
import { mutate } from 'swr'

import { Facility } from '@/types/supabaseAlias'
import { v4 as uuidv4 } from 'uuid'

import toast from 'react-hot-toast'

export const insertFacility = async (
  facility: Facility,
  facilityId?: string,
) => {
  try {
    const { data, error } = await supabase.from('facility').insert(facility)
    if (error) {
      throw new Error('Failed to add new facility')
    }
    return data // Assuming the response contains the updated data or success message
  } catch (error) {
    // Handle errors, such as network issues or server errors
    toast.error("Error adding new facility. Please contact Altum Labs Support.")
    throw new Error('Network/server error adding brand')
  }
}

export default async function insertAndShowBrands(data: {
  oldFacilities: Facility[] | null
  newFacility: Facility
  user: User | null
  newFacilityId?: string
}) {
  if (!data.newFacilityId) {
    data.newFacilityId = uuidv4()
  }
  data.newFacility.id = data.newFacilityId
  // const user = useUser();

  try {
    await insertFacility(data.newFacility)

    // Update the cache with the new brand by using SWR's mutate function
    if (data.oldFacilities) {
      mutate(
        `/api/facilities/${data.user?.id}`,
        [...data.oldFacilities, data.newFacility],
        false,
      )
    } else {
      throw new Error('unable to get brands of this user')
    }
  } catch (error) {
    toast.error("Error adding new facility. Please contact Altum Labs Support.")
    throw new Error('Failed to insert and show brands')
  }
}
