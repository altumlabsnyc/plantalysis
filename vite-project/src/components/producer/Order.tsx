import { ProducerLabOrderDetails } from '@/hooks/useLabOrders'

export enum StatusForProducer {
  NotClaimed = 'Waiting to be claimed',
  ClaimedByLab = 'Claimed by a lab',
  Analyzed = 'Analyzed by lab',
  Approved = 'Approved by regulator',
}

export interface OrderProps {
  orderData: ProducerLabOrderDetails
}

function getStatus(orderData: ProducerLabOrderDetails): StatusForProducer {
  let status = StatusForProducer.NotClaimed
  if (orderData.lab_user_id) {
    status = StatusForProducer.ClaimedByLab
    if (orderData.analysis_id) {
      status = StatusForProducer.Analyzed
      if (orderData.analysis_approved) {
        status = StatusForProducer.Approved
      }
    }
  }
  return status
}

function parseTime(time: string, parseMethod: string) {
  // args: time to parse, parseMethod that can be "time" or "date"
  const date = new Date(time)
  if (parseMethod === 'time') {
    return date.toLocaleString()
  } else if (parseMethod === 'date') {
    return date.toLocaleDateString()
  }
  return date.toLocaleString()
}

export default function Order({ orderData }: OrderProps) {
  const status = getStatus(orderData)
  return (
    <div className="prose max-w-4xl bg-white rounded-xl p-4 mt-2 mx-auto mb-4">
      {/* <h3>Order on {parseTime(orderData.order_time, "date")}</h3> */}
      <h3>{orderData.analysis_approved ? 'Approved' : 'Not Approved'}</h3>
      <div className="text-sm mt-2">
        <p className="font-bold my-0">Ordered on</p>
        <p className="text-gray-500 my-1">
          {parseTime(orderData.order_time, 'time')}
        </p>
        <p className="font-bold my-0">Order ID</p>
        <p className="text-gray-500 my-1">{orderData.id}</p>
        <p className="font-bold my-0">Pickup Location</p>
        <p className="text-gray-500 my-1">{orderData.location}</p>
        {orderData.analysis_id && (
          <>
            <p className="font-bold my-0">Analysis ID </p>
            <p className="text-gray-500 my-1">{orderData.analysis_id}</p>
          </>
        )}
        {orderData.lab_user_id && (
          <>
            <p className="font-bold my-0">Lab User ID </p>
            <p className="text-gray-500 my-1">{orderData.lab_user_id}</p>
          </>
        )}
      </div>
    </div>
  )
}
