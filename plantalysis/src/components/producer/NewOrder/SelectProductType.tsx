import { ProductType } from '@/types/supabaseAlias'
import classNames from 'classnames'

const options = [
  { type: 'flower', inStock: true },
  { type: 'concentrate', inStock: true },
  { type: 'edibles', inStock: true },
  { type: 'infusion', inStock: false },
]

interface Props {
  selectedProductType: ProductType
  setSelectedProductType: (productType: ProductType) => void
}

export default function SelectProductType({
  selectedProductType,
  setSelectedProductType,
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
                'bg-green-600 text-white': selectedProductType === option.type,
              },
              {
                'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50':
                  selectedProductType !== option.type,
              },
              'transition-all duration-300  flex items-center justify-center rounded-md py-2.5 px-2 text-sm font-semibold sm:flex-1',
            )}
            disabled={!option.inStock}
            onClick={() => setSelectedProductType(option.type as ProductType)}
          >
            <label
              className={classNames(
                { 'cursor-pointer': option.inStock },
                { 'cursor-not-allowed': !option.inStock },
              )}
            >
              {option.type}
            </label>
          </button>
        ))}
      </div>
    </div>
  )
}
