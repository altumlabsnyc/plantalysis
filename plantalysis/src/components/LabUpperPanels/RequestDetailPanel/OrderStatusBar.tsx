import React, { useState } from 'react'

import { LabRequest } from '@/hooks/useLabOrders'
import receiveResultsBy from '@/utils/receiveResultsBy'
import { format } from 'date-fns'
import './../../assets/css/panel.css'

const COMPLETED_COLOR = '#457F6C'
const INCOMPLETED_COLOR = '#D0D5DD'
const DATE_COLOR = '#667085'

interface statusBarStatusItemProps {
  status: string
  isCompleted?: boolean
}

function statusBarStatusItem({
  status,
  isCompleted,
}: statusBarStatusItemProps) {
  return (
    <div
      className="panel-text"
      style={{
        color: isCompleted ? COMPLETED_COLOR : INCOMPLETED_COLOR,
      }}
    >
      {status}
    </div>
  )
}

interface statusBarProgressBarItemProps {
  isCompleted?: boolean
  isFirst?: boolean
}

function statusBarProgressBarItem({
  isCompleted,
  isFirst,
}: statusBarProgressBarItemProps) {
  const backgroundColor = isCompleted ? COMPLETED_COLOR : INCOMPLETED_COLOR
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '6px',
          height: '16px',
          backgroundColor,
          borderRadius: '5px',
          zIndex: 10,
        }}
      />
      <div
        style={{
          position: 'relative',
          right: '50%',
          top: '-11px',
          width: isFirst ? '0' : '100%',
          height: '6px',
          backgroundColor,
        }}
      />
    </div>
  )
}

interface statusBarDateItemProps {
  date: string
}

function statusBarDateItem({ date }: statusBarDateItemProps) {
  return (
    <div className="panel-text" style={{ color: DATE_COLOR }}>
      {date}
    </div>
  )
}

interface statusBarItemProps {
  status: string
  date: string
  isCompleted?: boolean
  isFirst?: boolean
}

function statusBarItem({
  status,
  date,
  isCompleted,
  isFirst,
}: statusBarItemProps) {
  return (
    <div
      key={status}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
      }}
    >
      {statusBarStatusItem({
        status,
        isCompleted,
      })}
      {statusBarProgressBarItem({
        isCompleted,
        isFirst,
      })}
      {statusBarDateItem({
        date,
      })}
    </div>
  )
}

const ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '0 10px',
}

interface Props {
  order: LabRequest
}

export default function OrderStatusBar({ order }: Props) {
  const today = new Date()
  const threeDaysFromToday = new Date()
  threeDaysFromToday.setDate(today.getDate() + 3)

  const arr = [
    {
      status: 'Requested',
      date: format(new Date(order.order_time), 'MMM dd'),
    },
    {
      status: 'Claimed',
      date: format(new Date(), 'MMM dd'),
    },
    {
      status: 'Arrive at Lab',
      date: format(threeDaysFromToday, 'MMM dd'),
    },
    {
      status: 'Tested',
      date: format(
        receiveResultsBy(
          (order?.pickup_date && new Date(order.pickup_date)) || new Date(),
          order?.turnaround_time || '48',
        ),
        'MMM dd',
      ),
    },
  ]

  const data = arr
  const [currentStatus, setCurrentStatus] = useState<string | null>('Requested')
  const currentStatusIndex = arr.findIndex((e) => e.status == currentStatus)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={ROW_STYLE}>
        {data.map(({ status, date }, i) =>
          statusBarItem({
            status,
            date,
            isCompleted: i <= currentStatusIndex,
            isFirst: i == 0,
          }),
        )}
      </div>
    </div>
  )
}
