import { UserRole } from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'

import toast from 'react-hot-toast'

export async function handleSignIn(email: string, password: string) {
  try {
    const { data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (!data.user) return undefined

    const userType: UserRole = data.user.app_metadata.plantalysis_role

    console.log(data.user)
    console.log(userType)

    if (!userType) return undefined

    return userType
  } catch (error) {
    toast.error('Error during sign in. Please contact Altum Labs Support.')
    throw new Error('Error during sign in')
  }
}
