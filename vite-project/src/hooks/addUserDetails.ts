import { BaseUser } from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'
import { AllRolesData } from './handleSignUp'

export const insertUserDetails = async (userData: {
  userDetails: BaseUser
  roleData: AllRolesData
}) => {
  console.log(userData.userDetails, userData.roleData)
  const { error } = await supabase.from('user').insert([userData.userDetails])

  if (error) {
    throw new Error(
      'Failed to add new base user. Please contact Altum Labs support.',
    )
  }

  const id = userData.userDetails.id

  if (userData.roleData.labData) {
    userData.roleData.labData.id = id
    const address = userData.roleData.labData.address
    const labUserDataWithoutAddress = {
      ...userData.roleData.labData,
    }
    // @ts-ignore
    delete labUserDataWithoutAddress.address

    const { error: labUserError } = await supabase
      .from('lab_user')
      .insert([labUserDataWithoutAddress])

    if (labUserError) {
      throw new Error(labUserError.message)
    }

    // force refresh session to update claim data
    const { error: refreshError } = await supabase.auth.refreshSession()

    if (refreshError) {
      throw new Error(refreshError.message)
    }

    const { error: labAddressError } = await supabase
      .from('address')
      .insert([address])

    if (labAddressError) {
      throw new Error(labAddressError.message)
    }

    const { error: labUserFacilityError } = await supabase
      .from('lab_facility')
      .insert([
        {
          lab_user_id: id,
          address_id: userData.roleData.labData.address.id,
        },
      ])

    if (labUserFacilityError) {
      throw new Error(labUserFacilityError.message)
    }
  } else if (userData.roleData.regulatorData) {
    userData.roleData.regulatorData.id = id
    const address = userData.roleData.regulatorData.address
    const regulatorUserDataWithoutAddress = {
      ...userData.roleData.regulatorData,
    }
    // @ts-ignore
    delete regulatorUserDataWithoutAddress.address

    const { error: regulatorAddressError } = await supabase
      .from('address')
      .insert([address])

    if (regulatorAddressError) {
      throw new Error(regulatorAddressError.message)
    }

    const { error: regulatorUserError } = await supabase
      .from('regulator_user')
      .insert([regulatorUserDataWithoutAddress])

    if (regulatorUserError) {
      throw new Error(regulatorUserError.message)
    }
  } else if (userData.roleData.producerData) {
    userData.roleData.producerData.id = id
    const address = userData.roleData.producerData.address
    const producerUserDataWithoutAddress = {
      ...userData.roleData.producerData,
    }
    // @ts-ignore
    delete producerUserDataWithoutAddress.address

    const { error: producerUserError } = await supabase
      .from('producer_user')
      .insert([producerUserDataWithoutAddress])

    if (producerUserError) {
      throw new Error(producerUserError.message)
    }

    // force refresh session to update claim data
    const { error: refreshError } = await supabase.auth.refreshSession()

    if (refreshError) {
      throw new Error(refreshError.message)
    }

    const { error: producerAddressError } = await supabase
      .from('address')
      .insert([address])

    if (producerAddressError) {
      throw new Error(producerAddressError.message)
    }

    const { error: producerUserFacilityError } = await supabase
      .from('producer_facility')
      .insert([
        {
          producer_user_id: id,
          address_id: userData.roleData.producerData.address.id,
        },
      ])

    if (producerUserFacilityError) {
      throw new Error(producerUserFacilityError.message)
    }
  } else if (userData.roleData.universityData) {
    userData.roleData.universityData.id = id
    const address = userData.roleData.universityData.address
    const universityUserDataWithoutAddress = {
      ...userData.roleData.universityData,
    }
    // @ts-ignore
    delete universityUserDataWithoutAddress.address

    const { error: universityUserError } = await supabase
      .from('university_user')
      .insert([universityUserDataWithoutAddress])

    if (universityUserError) {
      throw new Error(universityUserError.message)
    }

    // force refresh session to update claim data
    const { error: refreshError } = await supabase.auth.refreshSession()

    if (refreshError) {
      throw new Error(refreshError.message)
    }

    const { error: universityAddressError } = await supabase
      .from('address')
      .insert([address])

    if (universityAddressError) {
      throw new Error(universityAddressError.message)
    }

    const { error: universityUserFacilityError } = await supabase
      .from('university_facility')
      .insert([
        {
          university_user_id: id,
          address_id: userData.roleData.universityData.address.id,
        },
      ])

    if (universityUserFacilityError) {
      throw new Error(universityUserFacilityError.message)
    }
  }
}

// IF NEEDED HANDLE MUTATION USERS CACHE
//   export default async function insertAndShowUsersDetails(data: {
//     oldBrands: [] | null;
//     newBrand: Brand;
//     user: User | null
//   }) {
//     const newBrandId = uuidv4();
//     data.newBrand.id = newBrandId;
//     // const user = useUser();

//     try {
//       await insertBrand(data.newBrand);

//       // Update the cache with the new brand by using SWR's mutate function
//       if (data.oldBrands){
//       mutate(`/api/brands/${data.user?.id}`, [...data.oldBrands, data.newBrand], false);
//       }
//       else{
//         throw new Error("unable to get brands of this user");
//       }
//     } catch (error) {
//       throw new Error("Failed to insert and show brands");
//     }
//   }
