import { supabase } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'
import { mutate } from 'swr'

import { Brand } from '@/types/supabaseAlias'
import { v4 as uuidv4 } from 'uuid'

export const insertBrand = async (brand: Brand, brandId?: string) => {
  //new Brand ID
  console.log(brandId)

  try {
    const { data, error } = await supabase.from('brand').insert(brand)
    if (error) {
      throw new Error('Failed to add new brand')
    }
    return data // Assuming the response contains the updated data or success message
  } catch (error) {
    // Handle errors, such as network issues or server errors
    throw new Error('Network/server error adding brand')
  }
}

export default async function insertAndShowBrands(data: {
  oldBrands: Brand[] | null
  newBrand: Brand
  user: User | null
  newBrandId?: string
}) {
  if (!data.newBrandId) {
    data.newBrandId = uuidv4()
  }
  data.newBrand.id = data.newBrandId
  // const user = useUser();

  try {
    await insertBrand(data.newBrand)

    // Update the cache with the new brand by using SWR's mutate function
    if (data.oldBrands) {
      mutate(
        `/api/brands/${data.user?.id}`,
        [...data.oldBrands, data.newBrand],
        false,
      )
    } else {
      throw new Error('unable to get brands of this user')
    }
  } catch (error) {
    throw new Error('Failed to insert and show brands')
  }
  return data // Assuming the response contains the updated data or success message
}
