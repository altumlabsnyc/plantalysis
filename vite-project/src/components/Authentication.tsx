import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "./Constants";
import { v4 as uuidv4 } from "uuid";
import { UserType, userData } from "./UserTypes";
import { Database } from "../types/supabase";

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

const handleSignIn = (email: string, password: string) => async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("User signed in:", data.user);
      const user = await supabase.auth.getUser();
      console.log(user.data.user?.id);
      // const userType = data.user.user_metadata.get("type");
      let userType: UserType = await getUserType();

      switch (userType) {
        case UserType.Base:
          window.location.href = "/library";
          break;
        case UserType.Regulator:
          window.location.href = "/regulator";
          break;
        case UserType.Lab:
          window.location.href = "/upload";
          break;
        case UserType.University:
          window.location.href = "/landing"; //update
          break;
        case UserType.Producer:
          window.location.href = "/landing"; //update
          break;
        default:
          window.location.href = "/login";
      }
      // window.location.href = "/regulator";
    }
  } catch (error) {
    console.error("Sign in failed:", error);
  }
};

const handleSignUp = (userData: userData, password: string) => async () => {
  try {
    //sign up
    await supabase.auth.signUp({
      email: userData.email,
      password: password,
    });

    //sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: password,
    });

    const user = await supabase.auth.getUser();
    console.log(user);

    if (error) {
      console.error(error);
    } else {
      console.log("User signed in:", data.user);

      data.user.user_metadata = userData;
      window.location.href = "/login";

      const userType: UserType = UserType.Base; //TODO: update when figure metadata
    }
  } catch (error) {
    console.error("Sign up failed:", error);
  }
};

const user: userData = {
  id: "dcca48da-9a45-4a36-b73e-1a296a1d8de9",
  first_name: "Catalina",
  last_name: "Monsalve",
  email: "catamon@m.edu",
  mfa_phone: "+18578694603",
  user_type: "regulator",
};

const { data, error } = await supabase.from("user").insert([user]);
console.log(error);
const userAuth = await supabase.auth.getUser();
console.log(userAuth.data.user?.id);

async function getUserType(): Promise<UserType> {
  return UserType.Base;
}

handleSignUp(user, "temp1234");

export default handleSignIn;
