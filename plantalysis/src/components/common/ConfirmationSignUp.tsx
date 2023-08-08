import { useEffect, useState } from 'react'

export default function SignUpConfirmation() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // make request to confirm email

    setLoading(false)
  }, [])

  return (
    <div>
      <h1>Thank you for signing up to Altum Labs</h1>
      <p>Please click the link below to activate and access your profile.</p>
      <p>Logging in will enable you to start an application for data.</p>
      <button>Login</button>
      <button>Home</button>
    </div>
  )
}
