import { supabase } from '@/utils/supabase'

import {
  Address,
  BaseUser,
  ConsumerUser,
  LabUser,
  ProducerUser,
  RegulatorUser,
  UniversityUser,
} from '@/types/supabaseAlias'

import { insertUserDetails } from '@/hooks/addUserDetails'

import delay from '@/utils/delay'
import redirectByRole from '@/utils/redirectByRole'
import toast from 'react-hot-toast'

export type AllRolesData = {
  labData?: LabUser & {
    address: Address
  }
  universityData?: UniversityUser & {
    address: Address
  }
  regulatorData?: RegulatorUser & {
    address: Address
  }
  producerData?: ProducerUser & {
    address: Address
  }
  consumerData?: ConsumerUser
}

export async function handleSignUp(history: any, userData: {
  userDetails: BaseUser
  password: string
  roleData: AllRolesData
}): Promise<void> {
  if (!userData.userDetails.email) {
    toast.error('Email lost. Please contact Altum Labs support.')
    return
  }

  //sign up
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: userData.userDetails.email,
    password: userData.password,
  })

  // refresh so client is authenticated
  const { error: refreshError } = await supabase.auth.refreshSession()

  if (refreshError) {
    toast.error(
      'Error refreshing user session. Please contact Altum Labs Support.',
    )
    return
  }

  if (signUpError) {
    toast.error('Error during sign up. Please contact Altum Labs Support.')
    return
  }

  const user = signUpData.user

  const id = user?.id

  if (!id) {
    toast.error('Error during sign up. Please contact Altum Labs Support.')
    return
  }

  userData.userDetails.id = id

  try {
    await insertUserDetails({
      userDetails: userData.userDetails,
      roleData: userData.roleData,
    })
  } catch (error: any) {
    toast.error(
      `Error during sign up: ${error}. Please contact Altum Labs Support.`,
    )
    return
  }

  toast.success('Sign up successful!')
  await delay(1000)
  redirectByRole(userData.userDetails.)
}
