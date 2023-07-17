import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "./Constants";
// import { v4 as uuidv4 } from "uuid";
import {
  UserType,
  userData,
  govUser,
  labUser,
  eduUser,
  prodUser,
} from "./UserTypes";
import { Database } from "../types/supabase";

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export async function handleSignIn(
  email: string,
  password: string
): Promise<void> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error(error);
    } else {
      // const userType = data.user.user_metadata.get("type");

      const userType = await getUserType();

      switch (userType) {
        case "consumer":
          window.location.href = "/library";
          break;
        case "regulator":
          window.location.href = "/regulator";
          break;
        case "lab":
          window.location.href = "/upload";
          break;
        case "university":
          window.location.href = "/landing"; //update
          break;
        case "producer":
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
}

export async function handleSignUp(
  userData: userData,
  password: string,
  labData: labUser | undefined = undefined,
  govData: govUser | undefined = undefined,
  prodData: prodUser | undefined = undefined,
  eduData: eduUser | undefined = undefined
): Promise<void> {
  try {
    const actualEmail: string = userData.email ? userData.email : "";
    //sign up
    const response = await supabase.auth.signUp({
      email: actualEmail,
      password: password,
    });

    // sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email: actualEmail,
      password: password,
    });

    const user = await supabase.auth.getUser();

    if (error) {
      console.error(error);
    } else {
      const id: string = user.data.user?.id ? user.data.user.id : "";
      if (id == "") {
        Error("User ID cannot be undefined");
      }
      userData.id = id;
      insertUser(userData);

      if (labData) {
        labData.id = id;
        await supabase.from("lab_user").insert([labData]);
      } else if (govData) {
        govData.id = id;
        await supabase.from("regulator_user").insert([govData]);
      } else if (prodData) {
        prodData.id = id;
        await supabase.from("producer_user").insert([prodData]);
      } else if (eduData) {
        eduData.id = id;
        const response = await supabase
          .from("university_user")
          .insert([eduData]);
        if (response.error) {
          console.log("unierror", error);
        }
      }
      console.log("paso?");
      // window.location.href = "/login";
    }
  } catch (error) {
    console.log("error inserting user", error);
  }
}

async function getUserType(): Promise<UserType | undefined | null> {
  const { data, error } = await supabase.from("user").select("user_type");
  if (data == null) {
    Error("No user type found");
    return data;
  }
}

async function insertUser(userData: userData): Promise<void> {
  const { data, error } = await supabase.from("user").insert([userData]);
  if (error) {
  }
}
