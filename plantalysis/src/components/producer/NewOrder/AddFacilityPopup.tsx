import Spinner from '@/components/common/Spinner'
import { insertFacility } from '@/hooks/addFacility'
import useFacilitiesDetails from '@/hooks/useFacilities'
import { Address, Facility } from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'
import { Dialog, Transition } from '@headlessui/react'
import { useUser } from '@supabase/auth-helpers-react'
import { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function AddFacilityPopup({ isOpen, setIsOpen }: Props) {
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-gray-900"
                >
                  Add facility
                </Dialog.Title>

                <div className="col-span-full my-2">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div className="my-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <select
                        name="region"
                        id="region"
                        defaultValue={'NY'}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setState(e.target.value)}
                        disabled
                      >
                        <option value="NY">New York</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        placeholder="14728"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setZip(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full my-2">
                  <label
                    htmlFor="nickname"
                    className="block text-sm font-medium leading-6"
                  >
                    Nickname
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="nickname"
                      id="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Facility 1"
                      onChange={(e) => setNickname(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-yellow-400 text-white transition-all duration-300 px-4 py-2 text-sm font-medium hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                    disabled={addingFacility}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="flex items-center rounded-md border border-transparent bg-green-600 text-white transition-all duration-300 px-4 py-2 text-sm font-medium hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={() => addFacility()}
                    disabled={addingFacility}
                  >
                    {addingFacility && (
                      <div className="mr-2 mb-0.5">
                        <Spinner size="xs" />
                      </div>
                    )}
                    Add facility
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
