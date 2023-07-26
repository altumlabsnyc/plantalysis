import Dashboard, { DashboardPanel } from '@/components/Dashboard'
import React from 'react'
import { Route } from 'react-router-dom'
import '../assets/dashboard/css/styles.css'
import PlaceNewOrder from './PlaceNewOrder.js'
import ProducerOrders from './ProducerOrders.js'

interface ProducerDashboardProps {
  children: React.ReactNode
}

function ProducerDashboard({ children }: ProducerDashboardProps) {
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
  ]
  return (
    <Dashboard role={'producer'} panels={panels}>
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
    </ProducerDashboard>
  )
}
