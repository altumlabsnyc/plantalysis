import delay from '@/utils/delay'
import redirectByRole from '@/utils/redirectByRole'
import { supabase } from '@/utils/supabase'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import Spinner from './Spinner'

/**
 * Page for email confirmation. This page is shown when the user clicks on the
 * link sent to their email address.
 *
 * Useeffect calls the function to update the user's email confirmation status
 */
export default function EmailConfirmation() {
  const history = useHistory()

  const [showFatal, setShowFatal] = useState(false)

  useEffect(() => {
    async function confirm() {
      try {
        // get id parameter from url
        const params = new URLSearchParams(location.search)
        const id = params.get('id')

        if (!id) throw new Error('ID not found')

        const backendURL = import.meta.env.VITE_BACKEND_DOMAIN
        if (!backendURL) throw new Error('Backend URL not found')

        await fetch(`${backendURL}/confirm-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
          }),
        }).then(async (res) => {
          if (!res.ok)
            throw new Error(
              'Could not confirm email. Please contact Altum Labs support.',
            )

          const { data, error: refreshError } =
            await supabase.auth.refreshSession()

          if (refreshError)
            throw new Error(
              'Could not refresh user session. Please contact Altum Labs support.',
            )

          toast.success('Email confirmation successful!')
          await delay(1000)
          redirectByRole(history, data.user?.app_metadata.plantalysis_role)
        })
      } catch (error: any) {
        setShowFatal(true)
        toast.error(
          error.message ||
            'Could not confirm email. Please contact Altum Labs support.',
        )
      }

      // refresh the user session
    }

    confirm()
  }, [])

  if (showFatal) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Toaster />
        <div>
          <div className="flex flex-col items-center prose">
            <h1 className="text-3xl font-bold text-center text-red-600">
              Could not confirm email. Please contact support @
              support@altumlabs.co.
            </h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Toaster />
      <div>
        <div className="flex flex-col items-center prose">
          <h1 className="text-3xl font-bold text-center text-green-600">
            Confirming email...
          </h1>
          <Spinner size="lg" />
        </div>
      </div>
    </div>
  )
}
