import { LabRequest } from '@/hooks/useLabOrders'
import { FingerPrintIcon } from '@heroicons/react/20/solid'
import './../../assets/css/panel.css'

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
          {labOrder.tests[0].test_category_name} Testing
        </div>
      </div>

      <ul className="ml-20 list-disc">
        {labOrder.tests.map((test) => (
          <li>
            <span className="font-semibold">{test.name}</span>
            <ul className="ml-4 list-disc mt-0">
              {test.test_requirements.map((req) => (
                <li>{req.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
