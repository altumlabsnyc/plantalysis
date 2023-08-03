import { Database } from "./supabase"

export type Batch = Database["public"]["Tables"]["batch"]["Row"]
export type InsertDemo = Database['public']['Tables']['demos_scheduled']['Row']
