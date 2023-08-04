import {
  Address,
  BaseUser,
  ConsumerUser,
  LabUser,
  ProducerUser,
  RegulatorUser,
  SamplingFirmUser,
} from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'
import toast from 'react-hot-toast'
import useSWR from 'swr'

export type RegulatorWithAddress = RegulatorUser & {
  address: Address
}
// You might need to define the data types, depending on what data is fetched
export type RoleDataType = (
  | ProducerUser
  | LabUser
  | RegulatorWithAddress
  | SamplingFirmUser
  | ConsumerUser
) & { role: string }
export type UserRoleDataType = {
  userDetails: BaseUser
  roleDetails: RoleDataType
}

/**
 * SWR hook that fetches user details from Supabase. Returns both user details
 * and role details. See function return type and UserRollDataType for exact return.
 *
 * @param user supabase user object
 * @returns {data, error, isLoading} data is null if user is null, otherwise it is
 * an object with userDetails and roleDetails. error is the error object from SWR.
 */
export default function useUserDetails(user: User | null) {
  const fetcher = async () => {
    let userError: any,
      userData: BaseUser | null,
      roleData: RoleDataType | null,
      roleError: any

    const userFetchPromise = supabase
      .from('user')
      .select('*')
      .eq('id', user?.id)
      .single()
      .then(({ data, error }) => {
        userData = data
        userError = error
      })

    let roleFetchPromise
    switch (user?.app_metadata.plantalysis_role) {
      case 'producer':
        roleFetchPromise = supabase
          .from('producer_user')
          .select('*')
          .eq('id', user?.id)
          .single()
          .then(({ data, error }) => {
            if (!data) return null
            roleData = { ...data, role: 'producer' }
            roleError = error
          })
        break
      case 'lab':
        roleFetchPromise = supabase
          .from('lab_user')
          .select('*')
          .eq('id', user?.id)
          .single()
          .then(({ data, error }) => {
            if (!data) return null
            roleData = { ...data, role: 'lab' }
            roleError = error
          })
        break
      case 'regulator':
        roleFetchPromise = supabase
          .from('regulator_user')
          .select(
            `
          *,
          address (
            *
          )`,
          )
          .eq('id', user?.id)
          .single()
          .then(({ data, error }) => {
            if (!data) return null
            roleData = { ...data, role: 'regulator' }
            roleError = error
          })
        break
      case 'sampling_firm':
        roleFetchPromise = supabase
          .from('sampling_firm_user')
          .select('*')
          .eq('id', user?.id)
          .single()
          .then(({ data, error }) => {
            if (!data) return null
            roleData = { ...data, role: 'sampling_firm' }
            roleError = error
          })
        break
      case 'consumer_user':
        roleFetchPromise = supabase
          .from('consumer_user')
          .select('*')
          .eq('id', user?.id)
          .single()
          .then(({ data, error }) => {
            if (!data) return null
            roleData = { ...data, role: 'consumer' }
            roleError = error
          })
        break
      default:
        break
    }

    // Await both promises
    await Promise.all([userFetchPromise, roleFetchPromise])

    // console.log(userData, roleData)

    // Combine errors into one if they exist
    const error = userError || roleError

    // console.log(error);

    if (error) toast.error(error.message)

    // @ts-ignore
    if (!userData || !roleData) {
      return null
    }

    // Return the combined data
    return { userDetails: userData, roleDetails: roleData }
  }

  const { data, error, isLoading } = useSWR(
    user ? `/api/role_user/${user.id}` : null,
    fetcher,
  )

  return {
    data: data as UserRoleDataType | null,
    error,
    isLoading,
  }
}
