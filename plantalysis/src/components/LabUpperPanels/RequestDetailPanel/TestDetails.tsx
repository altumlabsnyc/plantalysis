import { LabRequest } from '@/hooks/useLabOrders'
import { FingerPrintIcon } from '@heroicons/react/20/solid'
import './../../assets/css/panel.css'
import OrderRequirements from './OrderRequirements'

const BORDER_COLOR = '#D0D5DD'

interface Props {
  labOrder: LabRequest
}

export default function TestDetails({ labOrder }: Props) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          padding: '0 3px',
        }}
      >
        <div className="rounded-full border border-gray-300 p-2">
          <FingerPrintIcon className="h-6 w-6 text-green-500" />
        </div>
        <div className="text-lg font-bold ml-2">
          {labOrder?.tests?.[0] && labOrder.tests[0].test_category_name} Testing
        </div>
      </div>
      <div className="ml-20">
        <OrderRequirements labOrder={labOrder} />
      </div>
    </div>
  )
}
