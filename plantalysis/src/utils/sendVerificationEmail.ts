import toast from 'react-hot-toast'

/**
 * Sends a verification email to the user
 *
 * @param email The email to send the verification email to
 */
export default async function sendVerificationEmail(id: string, email: string) {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_DOMAIN

    await fetch(`${backendUrl}/send-verification-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, email }),
    })
  } catch (error) {
    toast.error(
      'Error sending verification email. Please contact Altum Labs Support.',
    )
    return
  }
}
