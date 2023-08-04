import useFacilitiesDetails, {
  FacilityWithAddress,
} from '@/hooks/useFacilities'
import { LabRequest } from '@/hooks/useLabOrders'
import receiveResultsBy from '@/utils/receiveResultsBy'
import { Dialog, Transition } from '@headlessui/react'
import { useUser } from '@supabase/auth-helpers-react'
import { format } from 'date-fns'
import { Fragment } from 'react'
import OrderRequirements from './OrderRequirements'

interface Props {
  activeLabOrder: LabRequest
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  activeFacility: FacilityWithAddress | null
}

export default function ClaimOrderPopup({
  activeLabOrder,
  isOpen,
  setIsOpen,
  activeFacility,
}: Props) {
  const user = useUser()
  const { data: facilitiesDetails, mutate: mutateFacilitiesDetails } =
    useFacilitiesDetails(user)

  const pickupDate = new Date(activeLabOrder.pickup_date || '')
  const threeDaysFromPickupDate = pickupDate.setDate(pickupDate.getDate() + 3)

  function closeModal() {
    setIsOpen(false)
  }

  if (!activeFacility) return null

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-gray-900"
                >
                  Claim Lab Order
                </Dialog.Title>
                <div className="mt-2">
                  To claim the lab order, you agree to the following timeline:{' '}
                  <ul className="list-decimal mx-4">
                    <li>
                      A sampling firm deliver the product to your{' '}
                      {activeFacility.name} <br />{' '}
                      <span className="underline">
                        {activeFacility.address.line_1 +
                          ', ' +
                          activeFacility.address.city +
                          ', ' +
                          activeFacility.address.state_code +
                          ' ' +
                          activeFacility.address.postal_code}
                      </span>
                      <br />
                      by {format(threeDaysFromPickupDate, 'MMMM do, yyyy')}
                    </li>
                    <li>
                      You will perform the following tests by{' '}
                      {format(
                        receiveResultsBy(
                          (activeLabOrder?.pickup_date &&
                            new Date(activeLabOrder.pickup_date)) ||
                            new Date(),
                          activeLabOrder?.turnaround_time || '48',
                        ),
                        'MMMM do, yyyy',
                      )}
                      :
                      <br />
                      <div className="ml-4">
                        <OrderRequirements labOrder={activeLabOrder} />
                      </div>
                    </li>
                  </ul>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
