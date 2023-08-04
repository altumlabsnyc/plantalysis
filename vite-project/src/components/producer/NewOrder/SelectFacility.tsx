import useFacilitiesDetails, {
  FacilityWithAddress,
} from '@/hooks/useFacilities'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useUser } from '@supabase/auth-helpers-react'
import { Fragment, useState } from 'react'
import AddFacilityPopup from './AddFacilityPopup'

interface Props {
  selectedFacility: FacilityWithAddress | undefined | null
  setSelectedFacility: (facility: FacilityWithAddress | null) => void
}

export default function SelectFacility({
  selectedFacility,
  setSelectedFacility,
}: Props) {
  const user = useUser()
  const { data: facilitiesDetails, mutate } = useFacilitiesDetails(user)

  const [showAddFacility, setShowAddFacility] = useState(false)

  console.log(facilitiesDetails)

  return (
    <>
      <AddFacilityPopup
        isOpen={showAddFacility}
        setIsOpen={setShowAddFacility}
      />
      {facilitiesDetails && facilitiesDetails?.length > 0 ? (
        <Listbox
          value={selectedFacility}
          onChange={(value) => {
            if (value) setSelectedFacility(value)
          }}
        >
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-50 border border-gray-200 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate text-center">
                {selectedFacility?.name || 'Create your first facility'}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
            >
              <Listbox.Options
                static
                className="z-50 absolute bg-white mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {facilitiesDetails &&
                  facilitiesDetails.map((facility, facilityIdx) => (
                    <Listbox.Option
                      key={facilityIdx}
                      className={({ active }) =>
                        `list-none relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-amber-100 text-amber-900'
                            : 'text-gray-900'
                        }`
                      }
                      value={facility}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {facility.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                <Listbox.Option
                  className={`ml-3 list-none relative cursor-pointer select-none py-2`}
                  onClick={() => {
                    setShowAddFacility(true)
                  }}
                  value={undefined}
                >
                  + Add facility
                </Listbox.Option>
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ) : (
        <div
          className={`border border-gray-200 text-center rounded-lg bg-gray-50 list-none relative cursor-pointer select-none py-2 shadow-md`}
          onClick={() => {
            setShowAddFacility(true)
          }}
        >
          + Create your first facility
        </div>
      )}
    </>
  )
}
