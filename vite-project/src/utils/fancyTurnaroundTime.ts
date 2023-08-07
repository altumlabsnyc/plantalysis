import { TurnaroundTime } from '@/types/supabaseAlias'

export default function fancyTurnaroundTime(turnaroundTime: TurnaroundTime) {
  switch (turnaroundTime) {
    case '48':
      return '48 hours'
    case '96':
      return '96 hours'
    case '168':
      return '1 week'
    case '336':
      return '2 weeks'
  }
}
