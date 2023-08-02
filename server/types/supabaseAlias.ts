import { Database } from "./supabase"

export type Batch = Database["public"]["Tables"]["batch"]["Row"]
