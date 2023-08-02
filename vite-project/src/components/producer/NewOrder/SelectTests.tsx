import useTestDetails from '@/hooks/useTests'
import { TestCategory, Test } from '@/types/supabaseAlias'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'
import AddFacilityPopup from './AddFacilityPopup'
import classNames from 'classnames'

interface Props {
  selectedTests: Set<Test> | undefined
  setSelectedTests: (tests: Set<Test>) => void
  category: TestCategory
}

export default function SelectTests({
  selectedTests,
  setSelectedTests,
  category,
}: Props) {
  const { data: testsDetails, mutate } = useTestDetails(category)
  console.log(testsDetails)

  return (
    <div className="mt-2">
      <label className="sr-only">Choose the tests you want to perform</label>
      <div className="flex justify-center gap-4">
        {testsDetails?.map((option) => (
          <label
            key={option.name}
            className={classNames(
              { 'cursor-not-allowed opacity-25': false },
              {
                'bg-green-600 text-white':
                  selectedTests && selectedTests.has(option),
              },
              {
                'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50':
                  selectedTests && !selectedTests.has(option),
              },
              'transition-all duration-300  flex items-center justify-center rounded-md py-2.5 px-2 text-sm font-semibold sm:flex-1',
            )}
          >
            <input
              type="checkbox"
              checked={selectedTests && selectedTests.has(option)}
              onChange={() => {
                const updatedTests = new Set(selectedTests)
                if (selectedTests?.has(option)) {
                  updatedTests.delete(option)
                } else {
                  updatedTests?.add(option)
                }
                setSelectedTests(updatedTests)
              }}
            />
            <span className="ml-2">{option.name}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
