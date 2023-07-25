import { UserType } from "@/components/UserTypes"
import { supabase } from "@/utils/supabase"

export async function handleSignIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (!data.user) return undefined

  const userType: UserType = data.user.app_metadata.plantalysis_role

  console.log(data.user)
  console.log(userType)

  if (!userType) return undefined

  return userType
}
