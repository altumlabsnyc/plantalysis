import Dashboard from '@/components/Dashboard'
import Bell from '@/components/assets/svg/Bell.svg'
import Clock from '@/components/assets/svg/Clock.svg'
import Sidebar from '@/components/assets/svg/Sidebar.svg'
import Star from '@/components/assets/svg/Star.svg'
import Sun from '@/components/assets/svg/Sun.svg'

import LabDashboardContent from '@/components/lab/LabDashboardContent'
import useUserDetails from '@/hooks/useUserDetails'
import { useUser } from '@supabase/auth-helpers-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Redirect, Route, Link, useHistory  } from 'react-router-dom'
import '../assets/dashboard/css/styles.css'
import Upload from '../regulatorDashboard/Upload.js'
import ClaimOrders from './ClaimOrders'
import CurrentOrders from './CurrentOrders'

interface LabDashboardProps {
  children: React.ReactNode
}

function LabDashboard({ children }: LabDashboardProps) {
  const user = useUser()
  const history = useHistory();
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

  const sidebarSections = [
    {
      title: 'Profile',
      items: [
        {
          text: 'Overview',
          onClick: () => toast('Overview coming soon!', { icon: '⭐' }),
        },
        {
          text: 'User Guide',
          onClick: () => toast('User Guide coming soon!', { icon: '⭐' }),
        },

        {
          text: 'Contacts',
          onClick: () => toast('Contacts coming soon!', { icon: '⭐' }),
        },
        {
          text: 'Order Management',
          onClick: () => toast('Order Management coming soon!', { icon: '⭐' }),
        },
      ],
    },
    {
      title: 'More',
      items: [
        {
          text: 'About',
          onClick: () => {
            <Link to="/about" />
            toast('About Us coming soon!', { icon: '⭐' })
          },
        },
        {
          text: 'Customer Support',
          onClick: () => {
            toast('Customer Support coming soon!', { icon: '⭐' })
          },
        },
        {
          text: 'Plantalysis Double Blind',
          onClick: () => {
            toast('Double Blind coming soon!', { icon: '⭐' })
          },
        },
        {
          text: 'Terms of Service',
          onClick: () => {
            history.push('/tos')
          },
        },
        {
          text: 'Privacy Policy',
          onClick: () => {
            history.push('/pp')
          },
        },
      ],
    },
  ]

  return (
    <Dashboard
      role={'lab'}
      dashboardTitle={
        !userDetails?.userDetails.first_name
          ? 'Welcome'
          : 'Welcome, ' + userDetails?.userDetails.first_name
      }
      sidebarTitle={
        !userDetails?.userDetails.first_name
          ? 'Welcome'
          : userDetails?.userDetails.first_name
      }
      sidebarSubtitle="Lab"
      sidebarSections={sidebarSections}
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
      <Route path="/dashboard/lab/overview">
        <LabDashboardContent />
      </Route>
      <Route path="/dashboard/lab/upload">
        <Upload />
      </Route>
      <Route path="/dashboard/lab/current-orders">
        <CurrentOrders />
      </Route>
      <Route path="/dashboard/lab/claim-new-orders">
        <ClaimOrders />
      </Route>
      <Redirect from="/dashboard/lab" to="/dashboard/lab/overview" />
    </LabDashboard>
  )
}
