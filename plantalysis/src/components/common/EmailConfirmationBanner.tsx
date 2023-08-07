import { useUser } from '@supabase/auth-helpers-react'
import classNames from 'classnames'

interface Props {
  sidebarOpen: boolean
}

export default function EmailConfirmationBanner({ sidebarOpen }: Props) {
  const user = useUser()

  console.log(sidebarOpen)

  return (
    <div className="sticky z-50 top-0 w-full bg-red-400 text-white text-center py-1 text-sm">
      <p className={classNames({ 'lg:ml-72 xl:mr-72': sidebarOpen })}>
        Please confirm your email address. Check {user?.email || 'your inbox'}{' '}
        for the confirmation link.
      </p>
    </div>
  )
}
