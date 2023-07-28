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

export default function Order({ orderData }: OrderProps) {
  const status = getStatus(orderData)
  return (
    <div className="prose max-w-4xl bg-white rounded-xl p-4 mt-2 mx-auto mb-4">
      <h3>Order # {orderData.id}</h3>
      <div className="text-sm mt-2">
        <p className="font-bold my-0">Pickup Location</p>
        <p className="text-gray-500 my-1">{orderData.location}</p>
        <p className="font-bold my-0">Order time</p>
        <p className="text-gray-500 my-1">{orderData.order_time}</p>
      </div>
    </div>
  )
}
