import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useUser } from '@supabase/auth-helpers-react'

import { ANALYSIS_REQUEST_TYPE, ForApproval, useAnalysis } from '@/hooks/useAnalysis.js'
import useLabOrders, { LabOrdersRequested } from '@/hooks/useLabOrders.js'
import Panel from '../Panel'
import Spinner from '../common/Spinner'
import { Analysis, RegulatorReview } from '@/types/supabaseAlias'
import Table from '../Table/Table'

export type RegulatorAnalysisTableRow = Analysis & {
  regulator_review: RegulatorReview[] | null,
  lab_order: {
    lab_user: {
      lab_name: string
    } | null,
    batch: {
      producer_user: {
        common_name: string
      } | null
    } | null
  } | null,
}

const columnHelper = createColumnHelper<ForApproval>()

export default function ApproveOrders() {
  const user = useUser()
  // const allLabOrders = useLabOrders(user, LabOrdersRequested.allOrders)
  // const analysisData = useAnalysis(user, allLabOrders.data)
  // const { data, error, isLoading } = useAnalysis(user, ANALYSIS_REQUEST_TYPE.ALL)
  const { data, error, isLoading } = useAnalysis()
  console.log(data)

  const columns = [
    columnHelper.accessor('lab_name', {
      header: "Lab",
      cell: (info) => (
        <div>
          {info.getValue()}
        </div>
      )
    }),
    columnHelper.accessor('finished_at', {
      header: "Date Populated",
      cell: (info) =>  {
        const dateString = info.getValue()
        return (
        <div>
          {dateString && format(new Date(dateString), "yyyy-MM-dd")}
        </div>
      )}
    }),
    columnHelper.accessor('producer_name', {
      header: "Producer",
      cell: (info) => (
        <div>
          {info.getValue()}
        </div>
      )
    }),
    columnHelper.accessor('analysis_id', {
      header: "View Details",
      id: 'view',
      cell: (info) => (
        <div
          style={{
            color: '#457F6C',
          }}
          className="my-1 text-sm cursor-pointer flex items-center"
          onClick={() => { }}
        >
          <span>View Details</span>
        </div>
      )
    })
  ]

  // if (analysisData.data) {
  //   return (
  //     <div>
  //       {analysisData.data.map((order: ForApproval) => (
  //         <p key={order.sku}>{order.brand_name}</p>
  //       ))}
  //     </div>
  //   )
  // } else {
  //   return <p>Loading...</p>
  // }
  return (<div className="w-full flex flex-wrap justify-around">
    <div className="flex flex-col justify-between gap-4 h-full">
      <Panel>
        <div
          className="w-128 py-2 max-h-64 overflow-y-scroll"
        >
          {
            isLoading
              ? (<div className="flex flex-col items-center justify-center h-64 w-full">
                <Spinner size="lg" />
              </div>)
              : (
                <>
                  <h3 style={{ color: '#457f6c' }} className="text-xl font-bold">
                    Analysis Pending Approval
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">
                    Analysis of orders pending regulator approval.
                  </p>
                  <div className="">
                    <Table<ForApproval>
                      data={data}
                      columns={columns}
                    />
                  </div>
                </>
              )
          }
        </div>
      </Panel>
    </div>
  </div>)
}
