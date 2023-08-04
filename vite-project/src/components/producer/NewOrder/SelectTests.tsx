import useTestDetails from '@/hooks/useTests'
import { Test, TestCategory, TestRequirement } from '@/types/supabaseAlias'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

interface Props {
  selectedTests: Set<Test> | undefined
  setSelectedTests: (tests: Set<Test>) => void
  category: TestCategory
  state: string | undefined
}

export default function SelectTests({
  selectedTests,
  setSelectedTests,
  category,
  state,
}: Props) {
  // console.log(state)
  const { data: testsDetails, mutate } = useTestDetails(category, true, state)
  // console.log(testsDetails)

  const [refresh, setRefresh] = useState(false)
  const [testRequirements, setTestRequirements] = useState<TestRequirement[]>(
    [],
  )

  useEffect(() => {
    if (testsDetails) {
      const requirements = testsDetails.reduce(
        (acc: TestRequirement[], test) => {
          if (test.test_requirements) {
            return [...acc, ...test.test_requirements]
          }
          return acc
        },
        [],
      )
      setTestRequirements(requirements)
    }
  }, [refresh])

  // console.log(testRequirements)

  return (
    <div className="mt-2">
      <label className="sr-only">Choose the tests you want to perform</label>
      <div className="flex justify-center gap-4">
        {testsDetails?.length === 0 && (
          <p className="text-red-400">
            No tests under available {category.name} for your region yet!
          </p>
        )}
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
              'transition-all cursor-pointer duration-300  flex items-center justify-center rounded-md py-2.5 px-2 text-sm font-semibold sm:flex-1',
            )}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={selectedTests && selectedTests.has(option)}
              onChange={() => {
                setRefresh(!refresh)
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
      {testRequirements.length > 0 && (
        <>
          The following levels will be tested:
          <ul className="text-sm max-h-36 overflow-scroll my-0">
            {testRequirements.map((requirement) => (
              <li className="text-sm my-0" key={requirement.id}>
                {requirement.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
