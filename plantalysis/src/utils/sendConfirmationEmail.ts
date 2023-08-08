/**
 * Sends a verification email to the user
 *
 * @param email The email to send the verification email to
 */
export default async function sendVerificationEmail(email: string) {
  const backendUrl = import.meta.env.VITE_BACKEND_DOMAIN

  await fetch(`${backendUrl}/send-verification-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
}
