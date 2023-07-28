import { LabRequest } from '@/hooks/useLabOrders'
import { FingerPrintIcon } from '@heroicons/react/20/solid'
import './../../assets/css/panel.css'

const BORDER_COLOR = '#D0D5DD'

interface Props {
  labOrder: LabRequest
}

export default function SampleDetails({ labOrder }: Props) {
  return (
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
        className="ml-4"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
          }}
        >
          <div className="text-lg font-bold">{labOrder.batch.strain}</div>
        </div>
        <div className="panel-text">{labOrder.batch.product_type}</div>
      </div>
    </div>
  )
}
