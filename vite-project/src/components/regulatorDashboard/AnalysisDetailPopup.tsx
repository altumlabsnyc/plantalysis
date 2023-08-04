import { createColumnHelper } from '@tanstack/react-table'
import { ForApproval } from '@/hooks/useAnalysis'
import { Dialog, Transition } from '@headlessui/react'
import { useUser } from '@supabase/auth-helpers-react'
import { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'
import Table from '../Table/Table'

type AnalysisDetailTableRow = {
    test_category_name: string
    test_requirement_name: string
    test_result: string
}

interface Props {
    activeAnalysis: ForApproval | null
    setClose: () => void
}

const columnHelper = createColumnHelper<AnalysisDetailTableRow>()

export default function AnalysisDetailPopup({ activeAnalysis, setClose }: Props) {
    const user = useUser()

    const data = activeAnalysis?.tests?.map(
        ({ test: { test_category_name }, reqResults }) =>
            reqResults.map(
                ({ requirement: { name: test_requirement_name }, result: { result: test_result } }) =>
                ({
                    test_category_name,
                    test_requirement_name,
                    test_result
                }))).flat() || []
    console.log(data)

    const columns = [
        columnHelper.accessor('test_category_name', {
            header: "Category",
            cell: info => <div>{info.getValue()}</div>
        }),
        columnHelper.accessor('test_requirement_name', {
            header: "Requirement",
            cell: info => <div>{info.getValue()}</div>
        }),
        columnHelper.accessor('test_result', {
            header: "Result",
            cell: info => <div>{info.getValue()}</div>
        })
    ]

    const isOpen = activeAnalysis != null

    function closeModal() {
        setClose()
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
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-semibold leading-6 text-gray-900"
                                >
                                    Analysis Details
                                </Dialog.Title>
                                <Table<AnalysisDetailTableRow>
                                    data={data}
                                    columns={columns}
                                />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
