
  import { supabase } from "@/utils/supabase"
  import { User } from "@supabase/supabase-js"
  import useSWR from "swr"
  import { useUser } from "@supabase/auth-helpers-react"
import useUserDetails from "./useUserDetails"
import { UserType } from "@/components/UserTypes"

export async function handleSignIn(
    email: string,
    password: string
  ): Promise<UserType> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
  
      if (error) {
        console.error(error);
        throw new Error("Couldn't sign up:" + error);
      } else {
        const userType: UserType = data.user.app_metadata.plantalysis_role;
        if (userType){
        return userType;
        }
        throw new Error("Your user doesn't have a valid type")
      }
    } catch (error) {
      console.error("Sign in failed:", error);
    }
    throw new Error("Unable to Sign In");
  }