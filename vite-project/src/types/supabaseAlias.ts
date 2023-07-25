import { Database } from "@/types/supabase"

export type BaseUser = Database["public"]["Tables"]["user"]["Row"]
export type ProducerUser = Database["public"]["Tables"]["producer_user"]["Row"]
export type LabUser = Database["public"]["Tables"]["lab_user"]["Row"]
export type UniversityUser = Database["public"]["Tables"]["university_user"]["Row"]
export type RegulatorUser =
  Database["public"]["Tables"]["regulator_user"]["Row"]
export type SamplingFirmUser =
  Database["public"]["Tables"]["sampling_firm_user"]["Row"]
export type ConsumerUser = Database["public"]["Tables"]["consumer_user"]["Row"]


export type Brand = Database['public']['Tables']['brand']['Row'];
export type Batch = Database['public']['Tables']['batch']['Row'];
export type Facility = Database['public']['Tables']['facility']['Row'];
export type Analysis = Database["public"]["Tables"]["analysis"]["Row"];
export type MoleculePredict =
  Database["public"]["Tables"]["molecule_prediction"]["Row"];
  export type LabOrder = Database["public"]["Tables"]["lab_order"]["Row"];


export type UserRole = Database["public"]["Enums"]["user_type_enum"]

