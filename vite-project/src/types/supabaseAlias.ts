import { Database } from '@/types/supabase'

export type BaseUser = Database['public']['Tables']['user']['Row']
export type ProducerUser = Database['public']['Tables']['producer_user']['Row']
export type LabUser = Database['public']['Tables']['lab_user']['Row']
export type UniversityUser =
  Database['public']['Tables']['university_user']['Row']
export type RegulatorUser =
  Database['public']['Tables']['regulator_user']['Row']
export type SamplingFirmUser =
  Database['public']['Tables']['sampling_firm_user']['Row']
export type ConsumerUser = Database['public']['Tables']['consumer_user']['Row']

export type Country = Database['public']['Tables']['country']['Row']
export type State = Database['public']['Tables']['state']['Row']
export type Address = Database['public']['Tables']['address']['Row']

export type Batch = Database['public']['Tables']['batch']['Row']
export type Facility = Database['public']['Tables']['producer_facility']['Row']
export type LabFacility = Database['public']['Tables']['lab_facility']['Row']
export type Analysis = Database['public']['Tables']['analysis']['Row']
export type MoleculePredict =
  Database['public']['Tables']['molecule_prediction']['Row']
export type LabOrder = Database['public']['Tables']['lab_order']['Row']

export type TestCategory = Database['public']['Tables']['test_category']['Row']
export type Test = Database['public']['Tables']['test']['Row']
export type TestRequirement =
  Database['public']['Tables']['test_requirement']['Row']
export type TestResult = Database['public']['Tables']['test_result']['Row']
export type RegulatorReview =
  Database['public']['Tables']['regulator_review']['Row']

export type UserRole = Database['public']['Enums']['user_type_enum']
export type TurnaroundTime = Database['public']['Enums']['turnaround_time_enum']
export type ProductType = Database['public']['Enums']['product_type_enum']
export type LicenseType = Database['public']['Enums']['license_type_enum']
