import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
  selectedPickupDate: Date
  setSelectedPickupDate: (date: Date) => void
}

export default function SelectPickupDate({
  selectedPickupDate,
  setSelectedPickupDate,
}: Props) {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return (
    <div className="flex flex-col items-center justify-center mt-3">
      <DatePicker
        selected={selectedPickupDate}
        onChange={(date) => date && setSelectedPickupDate(date)}
        className="px-3 py-2 border text-center border-gray-200 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        dateFormat="MM/dd/yyyy"
        minDate={tomorrow}
      />
    </div>
  )
}
