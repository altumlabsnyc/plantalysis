import Spinner from '@/components/common/Spinner'
import useFacilitiesDetails from '@/hooks/useFacilities'
import {
  Facility,
  ProductType,
  TurnaroundTime,
  TestCategory,
  Test,
} from '@/types/supabaseAlias'
import dollarToString from '@/utils/dollarToString'
import orderDetailsToPriceId from '@/utils/orderDetailsToPriceId'
import receiveResultsBy from '@/utils/receiveResultsBy'
import turnaroundTimeToPrice from '@/utils/turnaroundTimeToPriceString'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Stripe, loadStripe } from '@stripe/stripe-js'
import { useUser } from '@supabase/auth-helpers-react'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import DropdownLoading from './DropdownLoading'
import SelectFacility from './SelectFacility'
import SelectPickupDate from './SelectPickupDate'
import SelectProductType from './SelectProductType'
import SelectStrainName from './SelectStrainName'
import SelectTurnaroundTime from './SelectTurnaroundTime'
import useTestCategoriesDetails from '@/hooks/useTestCategories'
import SelectTestCategory from './SelectTestCategory'
import SelectTests from './SelectTests'

export default function NewOrder() {
  const user = useUser()
  const {
    data: facilitiesDetails,
    error: facilitiesError,
    isLoading: isFacilitiesLoading,
  } = useFacilitiesDetails(user)

  const {
    data: categoriesDetails,
    error: categoryError,
    isLoading: isCategoryLoading,
  } = useTestCategoriesDetails()

  const [loadingCheckout, setLoadingCheckout] = useState(false)
  const [stripe, setStripe] = useState<Stripe | null>(null)
  const [selectedFacility, setSelectedFacility] = useState<
    Facility | undefined
  >(facilitiesDetails?.[0])

  const [selectedCategory, setSelectedCategory] = useState<
    TestCategory | undefined
  >(categoriesDetails?.[0])

  const [selectedTests, setSelectedTests] = useState<Set<Test>>(new Set())

  const [selectedStrainName, setSelectedStrainName] = useState('')
  const [selectedProductType, setSelectedProductType] =
    useState<ProductType>('flower')
  const [selectedTurnaroundTime, setSelectedTurnaroundTime] =
    useState<TurnaroundTime>('168')
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const [selectedPickupDate, setSelectedPickupDate] = useState<Date>(tomorrow)

  async function handleCheckout() {
    if (!selectedFacility) {
      return toast.error('Please select a facility')
    }
    if (!selectedStrainName) {
      return toast.error('Please enter a strain name')
    }
    if (!stripe) {
      return toast.error(
        'Error loading checkout client. Please contact Altum support',
      )
    }

    setLoadingCheckout(true)

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}/create-checkout-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: orderDetailsToPriceId(
            selectedProductType,
            selectedTurnaroundTime,
          ),
          userId: user?.id,
          facilityId: selectedFacility.id,
          strainName: selectedStrainName,
          productType: selectedProductType,
          turnaroundTime: selectedTurnaroundTime,
          pickupDate: selectedPickupDate.toISOString(),
        }),
      },
    )

    const session = await response.json()

    setLoadingCheckout(false)

    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    })

    if (result.error) {
      toast.error('Error loading checkout client. Please contact Altum support')
    }
  }

  if (facilitiesError)
    toast.error('Please contact Altum support: ' + facilitiesError.message)

  useEffect(() => {
    async function fetchStripe() {
      const stripeInstance = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLIC_KEY,
      )
      // @ts-ignore
      setStripe(stripeInstance)
    }
    fetchStripe()
  }, [])

  useEffect(() => {
    console.log('change')
    if (facilitiesDetails) {
      setSelectedFacility(facilitiesDetails[0])
    }
  }, [facilitiesDetails])

  return (
    <div className="mx-4 mb-4">
      <div className="prose max-w-4xl bg-white shadow-xl rounded-xl p-4 mt-2 mx-auto mb-4">
        <h3>Place a new lab order</h3>
        <div className="text-sm mt-2">
          <p className="font-bold my-0">Pickup Location</p>
          <p className="text-gray-500 my-1">
            Select the facility where a sampling firm will pick up your product
          </p>
          {isFacilitiesLoading ? (
            <DropdownLoading />
          ) : (
            <SelectFacility
              selectedFacility={selectedFacility}
              setSelectedFacility={setSelectedFacility}
            />
          )}
        </div>
        <div className="text-sm mt-2">
          <p className="font-bold my-0">Test category</p>
          <p className="text-gray-500 my-1">
            Select the category of your order
          </p>
          {isCategoryLoading ? (
            <DropdownLoading />
          ) : (
            <SelectTestCategory
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        </div>
        {selectedCategory && (
          <div className="text-sm mt-2">
            <p className="font-bold my-0">Tests</p>
            <p className="text-gray-500 my-1">
              Select the tests you want to perform to your order
            </p>
            {isCategoryLoading ? (
              <DropdownLoading />
            ) : (
              <SelectTests
                selectedTests={selectedTests}
                setSelectedTests={setSelectedTests}
                category={selectedCategory}
              />
            )}
          </div>
        )}
        <div className="text-sm mt-4">
          <p className="font-bold my-0">Strain Information</p>
          <p className="text-gray-500 my-1">
            Other batch information will be automatically collected by the
            sampling firm
          </p>
          <SelectStrainName setSelectedStrainName={setSelectedStrainName} />
        </div>
        <div className="text-sm mt-4">
          <p className="font-bold my-0">Product Type</p>
          <p className="text-gray-500 my-1">Infusion testing coming soon</p>
          <SelectProductType
            selectedProductType={selectedProductType}
            setSelectedProductType={setSelectedProductType}
          />
        </div>
        <div className="text-sm mt-4">
          <p className="font-bold my-0">Turnaround Time</p>
          <p className="text-gray-500 my-1">
            How long until you get your test results
          </p>
          <SelectTurnaroundTime
            selectedTurnaroundTime={selectedTurnaroundTime}
            setSelectedTurnaroundTime={setSelectedTurnaroundTime}
          />
        </div>
        <div className="text-sm mt-4">
          <p className="font-bold my-0">Pickup Date</p>
          <p className="text-gray-500 my-1">
            When you want the sampling firm to pick up your product
          </p>
          <SelectPickupDate
            selectedPickupDate={selectedPickupDate}
            setSelectedPickupDate={setSelectedPickupDate}
          />
        </div>
        <div className="w-full flex flex-col items-center mt-4 border-t border-gray-300">
          <div className="w-full items-center text-sm flex justify-between">
            <p className="font-bold my-3 text-center">
              A sampling firm will pickup{' '}
              {selectedStrainName || '{strain info}'}{' '}
              {selectedProductType || '{product type}'} at{' '}
              {selectedFacility?.name} on{' '}
              {format(selectedPickupDate, 'MM/dd/yyyy')}
              {', '} and you&apos;ll get test results on or before{' '}
              {format(
                receiveResultsBy(selectedPickupDate, selectedTurnaroundTime),
                'MM/dd/yyyy',
              )}
            </p>
          </div>
          <button
            className="flex items-center bg-green-600 hover:bg-green-500 transition-all duration-300 text-white rounded px-4 py-2 ring-green-600 ring-offset-2"
            onClick={() => handleCheckout()}
          >
            {loadingCheckout && (
              <div className="mr-2 mb-0.5">
                <Spinner size="sm" />
              </div>
            )}
            Place Order for{' '}
            {dollarToString(turnaroundTimeToPrice(selectedTurnaroundTime))}
            <LockClosedIcon className="h-4 w-4 ml-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
