import Dashboard from '@/components/common/Dashboard'
import Bell from '@/components/assets/svg/Bell.svg'
import Clock from '@/components/assets/svg/Clock.svg'
import Sidebar from '@/components/assets/svg/Sidebar.svg'
import Star from '@/components/assets/svg/Star.svg'
import Sun from '@/components/assets/svg/Sun.svg'
import useUserDetails from '@/hooks/useUserDetails'
import { useUser } from '@supabase/auth-helpers-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Redirect, Route, useHistory } from 'react-router-dom'
import '../assets/dashboard/css/styles.css'
import ApproveOrders from './ApproveOrders.js'

interface ProducerDashboardProps {
  children: React.ReactNode
}

function ProducerDashboard({ children }: ProducerDashboardProps) {
  const user = useUser()
  const { data: userDetails } = useUserDetails(user)
  const history = useHistory()

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
      label: 'Place Order',
      onClick: () =>
        toast('Place Order coming soon!', {
          icon: '⭐',
        }),
    },
    {
      label: 'Orders',
      onClick: () =>
        toast('Orders coming soon!', {
          icon: '⭐',
        }),
    },
    {
      label: 'Manage Brands',
      onClick: () =>
        toast('Manage Brands coming soon!', {
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
          onClick: () => toast('About Us coming soon!', { icon: '⭐' }),
        },
        {
          text: 'Customer Support',
          onClick: () => toast('Customer Support coming soon!', { icon: '⭐' }),
        },
        {
          text: 'Plantalysis Double Blind',
          onClick: () => toast('Double Blind coming soon!', { icon: '⭐' }),
        },
        {
          text: 'Terms of Service',
          onClick: () => history.push('/tos'),
        },
        {
          text: 'Privacy Policy',
          onClick: () => history.push('/pp'),
        },
      ],
    },
  ]

  return (
    <Dashboard
      role={'regulator'}
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
      sidebarSubtitle="Regulator"
      sidebarSections={sidebarSections}
      headerIcons={headerIcons}
      headerLinks={headerLinks}
      desktopSidebarOpen={desktopSidebarOpen}
    >
      {children}
    </Dashboard>
  )
}

export default function ProducerDashboardRouter() {
  return (
    <>
      <ProducerDashboard>
        <Route path="/dashboard/regulator/approve-orders">
          <ApproveOrders />
        </Route>
        <Redirect
          from="/dashboard/regulator"
          to="/dashboard/regulator/approve-orders"
        />
      </ProducerDashboard>
    </>
  )
}
