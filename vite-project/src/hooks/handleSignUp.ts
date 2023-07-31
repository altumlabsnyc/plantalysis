import { supabase } from '@/utils/supabase'

import {
  BaseUser,
  ConsumerUser,
  LabUser,
  ProducerUser,
  RegulatorUser,
  UniversityUser,
} from '@/types/supabaseAlias'

import { insertUserDetails } from '@/hooks/addUserDetails'

import toast from 'react-hot-toast'

export type AllRolesData = {
  labData?: LabUser
  universityData?: UniversityUser
  regulatorData?: RegulatorUser
  producerData?: ProducerUser
  consumerData?: ConsumerUser
}

export async function handleSignUp(userData: {
  userDetails: BaseUser
  password: string
  roleData: AllRolesData
}): Promise<void> {
  try {
    if (!userData.userDetails.email) {
      throw new Error('Please provide a valid email')
    }
    //sign up
    const { data: data, error: error } = await supabase.auth.signUp({
      email: userData.userDetails.email,
      password: userData.password,
    })

    // sign in
    console.log('cual es el user?', await supabase.auth.getUser())
    // ver si se necesita sign in tambien
    //   const { data, error } = await supabase.auth.signInWithPassword({
    //     email: userData.email,
    //     password: password,
    //   });

    const user = data.user

    if (error) {
      console.error(error)
    } else {
      const id = user?.id
      if (!id) {
        throw new Error('Could not get user ID')
      }
      userData.userDetails.id = id

      await insertUserDetails({
        userDetails: userData.userDetails,
        roleData: userData.roleData,
      })

      window.location.href = '/dashboard/' + userData.userDetails.user_type
    }
  } catch (error) {
    toast.error("Error during sign up. Please contact Altum Labs Support.")
    console.log('error inserting user', error)
  }
}
