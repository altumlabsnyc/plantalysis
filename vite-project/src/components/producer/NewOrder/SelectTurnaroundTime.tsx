import { TurnaroundTime } from '@/types/supabaseAlias'
import fancyTurnaroundTime from '@/utils/fancyTurnaroundTime'
import classNames from 'classnames'

const options = [
  { type: '48', inStock: false },
  { type: '96', inStock: true },
  { type: '168', inStock: true },
  { type: '336', inStock: true },
]

interface Props {
  selectedTurnaroundTime: TurnaroundTime
  setSelectedTurnaroundTime: (turnaroundTime: TurnaroundTime) => void
}

export default function SelectProductType({
  selectedTurnaroundTime,
  setSelectedTurnaroundTime,
}: Props) {
  return (
    <div className="mt-2">
      <label className="sr-only">Choose a product type</label>
      <div className="flex justify-center gap-4">
        {options.map((option) => (
          <button
            key={option.type}
            className={classNames(
              { 'cursor-not-allowed opacity-25': !option.inStock },
              { 'cursor-pointer focus:outline-none': option.inStock },
              {
                'bg-green-600 text-white':
                  selectedTurnaroundTime === option.type,
              },
              {
                'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50':
                  selectedTurnaroundTime !== option.type,
              },
              'transition-all duration-300  flex items-center justify-center rounded-md py-2.5 px-2 text-sm font-semibold sm:flex-1',
            )}
            disabled={!option.inStock}
            onClick={() =>
              setSelectedTurnaroundTime(option.type as TurnaroundTime)
            }
          >
            <span
              className={classNames(
                { 'cursor-pointer': option.inStock },
                { 'cursor-not-allowed': !option.inStock },
              )}
            >
              {fancyTurnaroundTime(option.type as TurnaroundTime)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
