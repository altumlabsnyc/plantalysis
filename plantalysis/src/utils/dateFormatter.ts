/**
 * List of abbreviated month names.
 */
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

/**
 * Formats a date string into a human-readable format.
 * 
 * The function takes a date string, converts it into a Date object, and then
 * returns it in the format "Month Day, Year" (e.g., "Jan 1, 2023").
 * 
 * @param {string} str - The date string to be formatted.
 * @returns {string} The formatted date string.
 */
export default function formatDate(str: string) {
  const date = new Date(str)
  const year = date.getFullYear()
  const month = months[date.getMonth()]
  const dateVal = date.getDate()
  return month + ' ' + dateVal + ', ' + year
}
