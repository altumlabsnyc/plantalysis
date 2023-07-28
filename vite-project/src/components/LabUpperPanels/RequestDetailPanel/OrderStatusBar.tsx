import React, { useState } from 'react'

import './../../assets/css/panel.css'

const COMPLETED_COLOR = '#457F6C'
const INCOMPLETED_COLOR = '#D0D5DD'
const DATE_COLOR = '#667085'

const arr = [
  {
    status: 'Requested',
    date: 'May 1',
  },
  {
    status: 'Tested',
    date: 'May 16',
  },
  {
    status: 'Shipped',
    date: 'May 20',
  },
  {
    status: 'Delivered',
    date: 'May 31',
  },
]

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

export default function OrderStatusBar() {
  const data = arr
  const [currentStatus, setCurrentStatus] = useState<string | null>('Tested')
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
