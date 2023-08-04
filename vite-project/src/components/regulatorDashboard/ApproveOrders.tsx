import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useUser } from '@supabase/auth-helpers-react'

import {
  ANALYSIS_REQUEST_TYPE,
  ForApproval,
  useAnalysis,
} from '@/hooks/useAnalysis.js'
import Panel from '../common/Panel'
import Spinner from '../common/Spinner'
import { Analysis, RegulatorReview } from '@/types/supabaseAlias'
import Table from '../Table/Table'
import useUserDetails, { RegulatorWithAddress } from '@/hooks/useUserDetails'
import AnalysisDetailPopup from './AnalysisDetailPopup'
import { useState } from 'react'

const columnHelper = createColumnHelper<ForApproval>()

export default function ApproveOrders() {
  // const analysisData = useAnalysis(user, allLabOrders.data)
  // const { data, error, isLoading } = useAnalysis(user, ANALYSIS_REQUEST_TYPE.ALL)
  const user = useUser()
  const { data: userDetails } = useUserDetails(user)
  const roleDetails = userDetails?.roleDetails as RegulatorWithAddress
  const { data, error, isLoading } = useAnalysis(
    roleDetails && roleDetails.address.state_code,
  )
  console.log(data)

  const [activeAnalysis, setActiveAnalysis] = useState<ForApproval | null>(null)

  const columns = [
    columnHelper.accessor('lab_name', {
      header: 'Lab',
      cell: (info) => <div>{info.getValue() || 'Unknown'}</div>,
    }),
    columnHelper.accessor('finished_at', {
      header: 'Date Populated',
      cell: (info) => {
        const dateString = info.getValue()
        return (
          <div>{dateString && format(new Date(dateString), 'yyyy-MM-dd')}</div>
        )
      },
    }),
    columnHelper.accessor('producer_name', {
      header: 'Producer',
      cell: (info) => <div>{info.getValue() || 'Unknown'}</div>,
    }),
    columnHelper.accessor('analysis_id', {
      header: 'View Details',
      id: 'view',
      cell: (info) => (
        <div
          style={{
            color: '#457F6C',
          }}
          className="my-1 text-sm cursor-pointer flex items-center"
          onClick={() => {
            setActiveAnalysis(info.cell.row.original)
          }}
        >
          <span>View Details</span>
        </div>
      ),
    }),
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
  return (
    <div className="w-full flex flex-wrap justify-around">
      <div className="flex flex-col justify-between gap-4 h-full">
        <AnalysisDetailPopup
          activeAnalysis={activeAnalysis}
          setClose={() => setActiveAnalysis(null)}
          oldData={data}
        />
        <Panel>
          <div className="w-128 py-2 max-h-64 overflow-y-scroll">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64 w-full">
                <Spinner size="lg" />
              </div>
            ) : (
              <>
                <h3 style={{ color: '#457f6c' }} className="text-xl font-bold">
                  Analysis Pending Approval
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  Analysis of orders pending regulator approval.
                </p>
                <div className="">
                  <Table<ForApproval> data={data} columns={columns} />
                </div>
              </>
            )}
          </div>
        </Panel>
      </div>
    </div>
  )
}
