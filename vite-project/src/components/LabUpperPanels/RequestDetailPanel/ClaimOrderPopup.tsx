import { insertFacility } from '@/hooks/addFacility'
import useFacilitiesDetails from '@/hooks/useFacilities'
import { LabRequest } from '@/hooks/useLabOrders'
import { Address, Facility } from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'
import { Dialog, Transition } from '@headlessui/react'
import { useUser } from '@supabase/auth-helpers-react'
import { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  activeLabOrder: LabRequest
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function ClaimOrderPopup({
  activeLabOrder,
  isOpen,
  setIsOpen,
}: Props) {
  const user = useUser()
  const { data: facilitiesDetails, mutate: mutateFacilitiesDetails } =
    useFacilitiesDetails(user)

  const [addingFacility, setAddingFacility] = useState(false)
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('NY')
  const [zip, setZip] = useState('')
  const [nickname, setNickname] = useState('')

  function closeModal() {
    setIsOpen(false)
  }

  async function addFacility() {
    if (!user) return toast.error('Please log in to add a facility')

    if (addingFacility) return
    setAddingFacility(true)

    if (!address || !city || !state || !zip || !nickname) {
      setAddingFacility(false)
      return toast.error('Please fill out all fields')
    }

    const addressDB: Address = {
      id: uuidv4(),
      line_1: address,
      line_2: null,
      city: city,
      postal_code: zip,
      state_code: state,
      country_code: 'USA',
    }

    // add address to DB
    const { data, error: addressError } = await supabase
      .from('address')
      .insert([addressDB])

    if (addressError) {
      setAddingFacility(false)
      return toast.error(
        'Error adding address to database. Please contact Altum support.',
      )
    }

    const facility: Facility = {
      id: uuidv4(),
      producer_user_id: user.id || '',
      address_id: addressDB.id,
      name: nickname,
      description: null,
    }

    const newFacilities = facilitiesDetails
      ? [...facilitiesDetails, facility]
      : [facility]

    mutateFacilitiesDetails(newFacilities, false)

    try {
      await insertFacility(facility)
    } catch (error) {
      // toast.error('Error adding facility. Please contact Altum support.')
      // added toaster in hook definition
    }

    setAddingFacility(false)
    closeModal()
  }

  return (
    <Transition appear show={isOpen || addingFacility} as={Fragment}>
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
                    <li>A sampling firm deliver the product to </li>
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
