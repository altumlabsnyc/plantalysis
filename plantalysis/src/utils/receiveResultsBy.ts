import { TurnaroundTime } from '@/types/supabaseAlias'

/**
 * Calculates the date by which results will be received based on a given pickup date and turnaround time.
 * 
 * This function takes a pickup date and a turnaround time value, then calculates the date 
 * by which results will be received. For instance, if the turnaround time is "168" (1 week), 
 * and the pickup date is "2023-01-01", the function will return "2023-01-08".
 * 
 * @param {Date} pickupDate - The date when the item was picked up.
 * @param {TurnaroundTime} turnaroundTime - The numeric turnaround time value.
 * @returns {Date} The date by which results will be received.
 */
export default function receiveResultsBy(
  pickupDate: Date,
  turnaroundTime: TurnaroundTime,
): Date {
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
