import { UserRole } from '@/types/supabaseAlias'

/**
 * Use this function to redirect users based on their user type.
 *
 * @param {UserRole} userType - Type of the user. Could be one of the following: 'consumer', 'regulator', 'lab', 'university', 'producer'.
 * @throws Will throw an error if the user type is not valid.
 */
export default function redirectByRole(history: any, userType: UserRole) {
  switch (userType) {
    case 'consumer':
      history.push('/library')
      break
    case 'producer':
      history.push('/dashboard/producer')
      break
    case "lab":
      history.push("/dashboard/lab")
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
}
