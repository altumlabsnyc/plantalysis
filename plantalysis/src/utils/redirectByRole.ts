import { UserRole } from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'
import toast from 'react-hot-toast'

/**
 * Use this function to redirect users based on their user type.
 *
 * @param {UserRole} userType - Type of the user. Could be one of the following: 'consumer', 'regulator', 'lab', 'university', 'producer'.
 * @throws Will throw an error if the user type is not valid.
 */
export default async function redirectByRole(history: any, userType: UserRole) {
  try {
    switch (userType) {
      case 'consumer':
        history.push('/library')
        break
      case 'producer':
        history.push('/dashboard/producer')
        break
      case 'lab':
        history.push('/dashboard/lab')
        break
      case 'regulator':
        history.push('/dashboard/regulator')
        break
      case 'university':
        history.push('/dashboard/university')
        break
      // @ts-ignore
      case 'sampling_firm':
        history.push('/dashboard/sampling_firm')
        break
      default:
        throw new Error('You are not a valid user')
    }
  } catch (error) {
    const { data } = await supabase.auth.refreshSession()
    if (data) {
      redirectByRole(history, data.user?.app_metadata.plantalysis_role)
    } else {
      toast.error('Redirection error. Please sign in and try again.')
    }
  }
}
