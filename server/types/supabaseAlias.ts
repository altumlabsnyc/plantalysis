import { Database } from "./supabase"

export type Batch = Database["public"]["Tables"]["batch"]["Row"]
export type Test = Database["public"]["Tables"]["test"]["Row"]
