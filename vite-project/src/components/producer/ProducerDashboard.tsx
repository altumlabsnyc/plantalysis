import Dashboard from '@/components/Dashboard'
import Bell from '@/components/assets/svg/Bell.svg'
import Clock from '@/components/assets/svg/Clock.svg'
import Sidebar from '@/components/assets/svg/Sidebar.svg'
import Star from '@/components/assets/svg/Star.svg'
import Sun from '@/components/assets/svg/Sun.svg'
import Brands from '@/components/producer/MyBrands'
import useUserDetails from '@/hooks/useUserDetails'
import { useUser } from '@supabase/auth-helpers-react'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Route, useHistory } from 'react-router-dom'
import '../assets/dashboard/css/styles.css'
import Facilities from './MyFacilities'
import NewOrder from './NewOrder'
import ProducerOrders from './ProducerOrders.js'

interface ProducerDashboardProps {
  children: React.ReactNode
}

function ProducerDashboard({ children }: ProducerDashboardProps) {
  const history = useHistory()
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
      onClick: () => toast('Overview coming soon!', { icon: '⭐' }),
    },
    {
      label: 'Place Order',
      onClick: () => history.push('/dashboard/producer/new-order'),
    },
    {
      label: 'Orders',
      onClick: () => history.push('/dashboard/producer/orders'),
    },
    {
      label: 'Manage Brands',
      onClick: () => history.push('/dashboard/producer/brands'),
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
          onClick: () => toast('Terms of Service coming soon!', { icon: '⭐' }),
        },
        {
          text: 'Privacy Policy',
          onClick: () => toast('Privacy Policy coming soon!', { icon: '⭐' }),
        },
      ],
    },
  ]

  return (
    <Dashboard
      role={'producer'}
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
      sidebarSubtitle="Producer"
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
    <ProducerDashboard>
      <Route path="/dashboard/producer/new-order">
        <NewOrder />
      </Route>
      <Route path="/dashboard/producer/orders">
        <ProducerOrders />
      </Route>
      <Route path="/dashboard/producer/brands">
        <Brands />
      </Route>
      <Route path="/dashboard/producer/facilities">
        <Facilities />
      </Route>
    </ProducerDashboard>
  )
}
