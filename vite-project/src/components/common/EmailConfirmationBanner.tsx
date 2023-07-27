import { useUser } from '@supabase/auth-helpers-react'

export default function EmailConfirmationBanner() {
  const user = useUser()

  return (
    <div className="sticky top-0 w-full bg-red-400 text-white text-center py-1 text-sm">
      <p className="lg:ml-72 xl:mr-72">
        Please confirm your email address. Check {user?.email || 'your inbox'}{' '}
        for the confirmation link.
      </p>
    </div>
  )
}
