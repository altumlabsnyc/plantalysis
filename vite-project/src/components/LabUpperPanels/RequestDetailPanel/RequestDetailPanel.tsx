import Panel from '../../Panel'

import './../../assets/css/panel.css'

import Spinner from '@/components/common/Spinner'
import { LabRequest, useLabOrderRequests } from '@/hooks/useLabOrders'
import formatDate from '@/utils/dateFormatter'
import receiveResultsBy from '@/utils/receiveResultsBy'
import { TruckIcon } from '@heroicons/react/20/solid'
import { useUser } from '@supabase/auth-helpers-react'
import { format } from 'date-fns'
import { useState } from 'react'
import ClaimOrderPopup from './ClaimOrderPopup'
import OrderStatusBar from './OrderStatusBar'
import SeparationBar from './SeparationBar'
import TestDetails from './TestDetails'

interface RequestDetailPanel {
  activeLabOrder: LabRequest | null
}

export default function RequestDetailPanel({
  activeLabOrder,
}: RequestDetailPanel) {
  console.log(activeLabOrder)
  const user = useUser()
  const { data: labRequests, isLoading, mutate } = useLabOrderRequests(user)

  const [showClaimPopup, setShowClaimPopup] = useState(false)
  const [claiming, setClaiming] = useState(false)

  const isApproved = activeLabOrder?.lab_facility_id != null

  if (labRequests && labRequests.length == 0) {
    return (
      <Panel>
        <div className="h-full w-full flex flex-col items-center justify-center">
          <p className="text-lg font-bold">No orders to claim</p>
        </div>
      </Panel>
    )
  }

  return (
    <Panel>
      {activeLabOrder && (
        <ClaimOrderPopup
          activeLabOrder={activeLabOrder}
          isOpen={showClaimPopup}
          setIsOpen={setShowClaimPopup}
        />
      )}
      <div
        style={
          {
            // fontFamily: 'Poppins',
            // display: 'flex',
            // flexDirection: 'column',
            // gap: '30px',
            // padding: '6px 6px',
          }
        }
        className="flex flex-column gap-3 text-sm p-1 py-2 w-96"
      >
        {!activeLabOrder || claiming ? (
          <div className="h-full w-96 flex flex-col items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <div className="w-full flex justify-between">
              <p className="panel-title flex flex-col">
                <span className="text-xl font-bold">Order Request</span>
                <span
                  // className="panel-subtitle"
                  // style={{
                  //   fontSize: '10px',
                  // }}
                  className="text-xs"
                >
                  {activeLabOrder?.id}
                </span>
              </p>
              <button
                onClick={async () => {
                  setShowClaimPopup(true)
                  return
                  // setClaiming(true)
                  // try {
                  //   await mutate((data) => {
                  //     if (!data) return
                  //     return data.filter((e) => e.id != activeLabOrder.id)
                  //   }, false)
                  //   await approveLabOrder(
                  //     activeLabOrder.id,
                  //     user,
                  //     labRequests,
                  //     'NY',
                  //   ).then((data) => console.log(data))
                  //   toast.success('Order claimed successfully!')
                  // } catch (error) {
                  //   toast.error('Error claiming order')
                  // }

                  // setClaiming(false)
                }}
                disabled={claiming}
                className="w-24 flex justify-center items-center border border-gray-300 px-4 text-lg py-1 bg-green-500 transition-all duration-300 hover:bg-green-600 text-white rounded-md"
              >
                {claiming ? (
                  <Spinner size="md" />
                ) : (
                  <span>{isApproved ? 'Claimed' : 'Claim'}</span>
                )}
              </button>
            </div>
            <div className="text-sm flex items-center justify-between">
              <div className="text-sm">
                <span style={{ color: '#667085' }}>Order Date: </span>
                <span style={{ fontWeight: 600 }}>
                  {activeLabOrder
                    ? formatDate(activeLabOrder.order_time)
                    : '0000'}
                </span>
              </div>
              <SeparationBar />
              <div className="panel-subtitle flex items-center text-sm font-bold">
                <TruckIcon className="h-4 w-4 mr-1" />
                {'Test by: ' +
                  format(
                    receiveResultsBy(
                      (activeLabOrder?.pickup_date &&
                        new Date(activeLabOrder.pickup_date)) ||
                        new Date(),
                      activeLabOrder?.turnaround_time || '48',
                    ),
                    'MM/dd/yyyy',
                  )}
              </div>
            </div>
            <SeparationBar horizontal />
            <OrderStatusBar order={activeLabOrder} />
            <div className="mt-2">
              <TestDetails labOrder={activeLabOrder} />
            </div>
            {/* <DeliveryNotes notes={'none'} /> */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              {/* <DeliveryDetails
                address={'123 Brooklyn Bridge, New York, NY'}
                contactInfo={'123-333-8000'}
              />
              <PaymentDetails paymentMethod="VISA" last2Digits="56" /> */}
            </div>
          </>
        )}
      </div>
    </Panel>
  )
}
