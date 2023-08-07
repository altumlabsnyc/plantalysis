import { LabOrder } from '@/types/supabaseAlias'
import { ForApproval } from '@/hooks/useAnalysis'

export type LabOrderTableRow = LabOrder & {
  status: string
}

export type AnalysisTableRow = ForApproval & {
  status: string
}

export enum OrderStatus {
  NOT_CLAIMED = 'Not Claimed',
  CLAIMED = 'Claimed',
  NOT_APPROVED = 'NOT_APPROVED',
  APPROVED = 'APPROVED',
}
