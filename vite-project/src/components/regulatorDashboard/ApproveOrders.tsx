import { useEffect, useState } from 'react'

import { useUser } from '@supabase/auth-helpers-react'
import { fetchAnalyzedOrders } from '../Authentication.js'
import { AnalysisTableRow, ForApproval, NOT_APPROVED } from '../UserTypes.js'
import AnalysisTable from './AnalysisTable.js'

export default function ApproveOrders() {
  const user = useUser()

  const [analysis, setAnalysis] = useState<Array<AnalysisTableRow>>([])
  const [loading, setLoading] = useState(true)
  console.log(loading)
  useEffect(() => {
    async function fetchAnalysis() {
      setLoading(true)
      if (user) {
        setAnalysis(
          (await fetchAnalyzedOrders()).map(
            (t: ForApproval): AnalysisTableRow => {
              return { ...t, status: NOT_APPROVED }
            },
          ),
        )
        setLoading(false)
      }
    }

    fetchAnalysis()
  }, [user])

  return <AnalysisTable analysis={analysis} />
}
