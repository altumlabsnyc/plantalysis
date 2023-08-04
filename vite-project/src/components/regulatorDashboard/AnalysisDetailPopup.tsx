import { createColumnHelper } from '@tanstack/react-table'
import { ForApproval } from '@/hooks/useAnalysis'
import { Dialog, Transition } from '@headlessui/react'
import { useUser } from '@supabase/auth-helpers-react'
import { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'
import Table from '../Table/Table'
import { approveLabOrder } from '@/hooks/approveLabOrder'
import Spinner from '../common/Spinner'
import useUserDetails, { RegulatorWithAddress } from '@/hooks/useUserDetails'

type AnalysisDetailTableRow = {
  test_category_name: string
  test_requirement_name: string
  test_result: string
}

interface Props {
  activeAnalysis: ForApproval | null
  setClose: () => void
  oldData: ForApproval[]
}

const columnHelper = createColumnHelper<AnalysisDetailTableRow>()

export default function AnalysisDetailPopup({
  activeAnalysis,
  setClose,
  oldData,
}: Props) {
  const user = useUser()
  const { data: userDetails } = useUserDetails(user)
  const roleDetails = userDetails?.roleDetails as RegulatorWithAddress
  const state = roleDetails && roleDetails.address.state_code

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const data =
    activeAnalysis?.tests
      ?.map(({ test: { test_category_name }, reqResults }) =>
        reqResults.map(
          ({
            requirement: { name: test_requirement_name },
            result: { result: test_result },
          }) => ({
            test_category_name,
            test_requirement_name,
            test_result,
          }),
        ),
      )
      .flat() || []

  const columns = [
    columnHelper.accessor('test_category_name', {
      header: 'Category',
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor('test_requirement_name', {
      header: 'Requirement',
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor('test_result', {
      header: 'Result',
      cell: (info) => <div>{info.getValue()}</div>,
    }),
  ]

  const isOpen = activeAnalysis != null

  function closeModal() {
    setClose()
  }

  async function onApproveOrder() {
    if (isLoading) return
    if (!activeAnalysis || !activeAnalysis.analysis_id) {
      toast.error(
        'Error approving analysis. Please contact Altum Labs Support.',
      )
      return
    }

    setIsLoading(true)

    try {
      await approveLabOrder(activeAnalysis.analysis_id, user, oldData, state)
    } catch (error) {
      setIsLoading(false)
    }

    setIsLoading(false)
    closeModal()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <div className="flex items-center">
                  <Dialog.Title
                    as="h3"
                    className="font-semibold text-gray-900"
                    style={{
                      fontSize: '1.125rem',
                      lineHeight: '1.125rem',
                      height: '1.125rem',
                      textAlign: 'center',
                    }}
                  >
                    Analysis Details
                  </Dialog.Title>

                  <button
                    className="relative flex items-center ml-auto bg-yellow-400 px-6 py-2 rounded-md shadlow-lg transition-all hover:bg-yellow-500 duration-300 text-white"
                    onClick={onApproveOrder}
                  >
                    {isLoading && (
                      <div className="absolute right-2 bottom-2.5">
                        <Spinner size="xs" />
                      </div>
                    )}
                    Approve
                  </button>
                </div>
                <Table<AnalysisDetailTableRow> data={data} columns={columns} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
