import { LabRequest } from '@/hooks/useLabOrders'

interface Props {
  labOrder: LabRequest
}

export default function OrderRequirements({ labOrder }: Props) {
  return (
    <ul className="list-disc">
      {labOrder.tests.map((test) => (
        <li key={test.id}>
          <span className="font-semibold">{test.name}</span>
          <ul className="ml-4 list-disc mt-0">
            {test.test_requirements.map((req) => (
              <li key={req.id}>{req.name}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
