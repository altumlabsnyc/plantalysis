import Dashboard, { DashboardPanel } from '@/components/Dashboard'
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
import { Route } from 'react-router-dom'
import '../assets/dashboard/css/styles.css'
import Facilities from './MyFacilities'
import PlaceNewOrder from './PlaceNewOrder.js'
import ProducerOrders from './ProducerOrders.js'

interface ProducerDashboardProps {
  children: React.ReactNode
}

function ProducerDashboard({ children }: ProducerDashboardProps) {
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

  console.log(desktopSidebarOpen)

  const panels: DashboardPanel[] = [
    {
      link: '/dashboard/producer/new-order',
      icon: <i className="fas fa-tachometer-alt" />,
      text: 'Place New Order',
    },
    {
      link: '/dashboard/producer/orders',
      icon: <i className="fas fa-book-open" />,
      text: 'Current Orders',
    },
    {
      link: '/dashboard/producer/brands',
      icon: <i className="fas fa-book-open" />,
      text: 'My Brands',
    },
    {
      link: '/dashboard/producer/facilities',
      icon: <i className="fas fa-book-open" />,
      text: 'My Facilities',
    },
  ]

  return (
    <Dashboard
      role={'producer'}
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

export default function ProducerDashboardRouter() {
  return (
    <ProducerDashboard>
      <Route path="/dashboard/producer/new-order">
        <PlaceNewOrder />
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
