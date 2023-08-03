/**
 * Convert the phone number string to E.164 format if possible, otherwise throw an error.
 *
 * @param phoneNumber phone number string to convert to E.164 format
 * @returns valid phone number in E.164 format
 */
export default function toE164(phoneNumber: string): string {
  // Remove non-digit characters
  let digitsOnly = phoneNumber.replace(/\D/g, '')

  // Check if the string is a valid phone number
  const isValid = /^\d{10}$/.test(digitsOnly)
  if (!isValid) {
    throw new Error('Invalid phone number')
  }

  // Add country code if not present
  if (!/^1/.test(digitsOnly)) {
    digitsOnly = '1' + digitsOnly
  }

  // Convert to E.164 format
  const e164 = '+' + digitsOnly

  return e164
}
