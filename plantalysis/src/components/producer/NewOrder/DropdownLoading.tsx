import Spinner from '@/components/common/Spinner'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'

export default function componentName() {
  return (
    <div className="relative mt-2">
      <button
        disabled
        className="flex justify-between items-center relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
      >
        <div />
        <Spinner size="sm" />
        <ChevronUpDownIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </button>
    </div>
  )
}
