import { TurnaroundTime } from '@/types/supabaseAlias'

export default function receiveResultsBy(
  pickupDate: Date,
  turnaroundTime: TurnaroundTime,
) {
  const receiveDate = new Date(pickupDate)
  switch (turnaroundTime) {
    case '48':
      receiveDate.setDate(receiveDate.getDate() + 2)
      break
    case '96':
      receiveDate.setDate(receiveDate.getDate() + 4)
      break
    case '168':
      receiveDate.setDate(receiveDate.getDate() + 7)
      break
    case '336':
      receiveDate.setDate(receiveDate.getDate() + 14)
      break
  }
  return receiveDate
}
