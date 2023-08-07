/**
 * Checks whether the given email is valid.
 *
 * @param email - The email address to validate.
 * @returns true if the email is valid, false otherwise.
 */
export default function isValidEmail(
  email: string | undefined | null,
): boolean {
  if (!email) return false

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  return emailRegex.test(email)
}
