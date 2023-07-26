import Dashboard, { DashboardPanel } from '@/components/Dashboard'
import Bell from '@/components/assets/svg/Bell.svg'
import Clock from '@/components/assets/svg/Clock.svg'
import Sidebar from '@/components/assets/svg/Sidebar.svg'
import Star from '@/components/assets/svg/Star.svg'
import Sun from '@/components/assets/svg/Sun.svg'
import useUserDetails from '@/hooks/useUserDetails'
import { useUser } from '@supabase/auth-helpers-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Route } from 'react-router-dom'
import '../assets/dashboard/css/styles.css'
import Upload from '../regulatorDashboard/Upload.js'
import ClaimOrders from './ClaimOrders'
import CurrentOrders from './CurrentOrders'

interface LabDashboardProps {
  children: React.ReactNode
}

function LabDashboard({ children }: LabDashboardProps) {
  const user = useUser()
  const { data: userDetails } = useUserDetails(user)

  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true)

  const headerIcons = [
    {
      icon: Sun,
      onClick: () =>
        toast('Dark mode coming soon!', {
          icon: '🌞',
        }),
    },
    {
      icon: Clock,
      onClick: () =>
        toast("I don't know what this does!", {
          icon: '🕒',
        }),
    },
    {
      icon: Bell,
      onClick: () =>
        toast('Notifications coming soon!', {
          icon: '🔔',
        }),
    },
    {
      icon: Sidebar,
      onClick: () => setDesktopSidebarOpen(!desktopSidebarOpen),
    },
    {
      icon: Star,
      onClick: () =>
        toast("I don't know what this does!", {
          icon: '⭐',
        }),
    },
  ]

  const headerLinks = [
    {
      label: 'Overview',
      onClick: () =>
        toast('Overview coming soon!', {
          icon: '⭐',
        }),
    },
    {
      label: 'Upload',
      onClick: () =>
        toast('Upload coming soon!', {
          icon: '⭐',
        }),
    },
    {
      label: 'QR Code',
      onClick: () =>
        toast('QR Code coming soon!', {
          icon: '⭐',
        }),
    },
    {
      label: 'Calendar',
      onClick: () =>
        toast('Calendar coming soon!', {
          icon: '⭐',
        }),
    },
    {
      label: 'Track Shipments',
      onClick: () =>
        toast('Track coming soon!', {
          icon: '⭐',
        }),
    },
    {
      label: 'Settings',
      onClick: () =>
        toast('Settings coming soon!', {
          icon: '⭐',
        }),
    },
  ]

  const panels: DashboardPanel[] = [
    {
      link: '/dashboard/lab/upload',
      icon: <i className="fas fa-tachometer-alt" />,
      text: 'Upload Sample Data',
    },
    {
      link: '/dashboard/lab/current-orders',
      icon: <i className="fas fa-book-open"></i>,
      text: 'Current Orders',
    },
    {
      link: '/dashboard/lab/claim-new-orders',
      icon: <i className="fas fa-book-open"></i>,
      text: 'Claim Lab Orders',
    },
  ]
  return (
    <Dashboard
      role={'lab'}
      panels={panels}
      dashboardTitle={
        !userDetails?.userDetails.first_name
          ? 'Welcome'
          : 'Welcome, ' + userDetails?.userDetails.first_name
      }
      headerIcons={headerIcons}
      headerLinks={headerLinks}
      desktopSidebarOpen={desktopSidebarOpen}
    >
      {children}
    </Dashboard>
  )
}

export default function LabDashboardRouter() {
  return (
    <LabDashboard>
      <Route path="/dashboard/lab/upload">
        <Upload />
      </Route>
      <Route path="/dashboard/lab/current-orders">
        <CurrentOrders />
      </Route>
      <Route path="/dashboard/lab/claim-new-orders">
        <ClaimOrders />
      </Route>
    </LabDashboard>
  )
}
