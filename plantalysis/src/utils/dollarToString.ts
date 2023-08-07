/**
 * Convert a dollar amount to a string
 * @param dollar dollar amount
 * @returns dollar amount as a string
 */
export default function dollarToString(dollar: number) {
  return dollar.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}
