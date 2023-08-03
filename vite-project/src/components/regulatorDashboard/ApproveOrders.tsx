import { ForApproval, useAnalysis } from '@/hooks/useAnalysis.js'

export default function ApproveOrders() {
  const analysisData = useAnalysis()
  console.log(analysisData)

  if (analysisData.data) {
    return <div></div>
  } else {
    return <p>Loading...</p>
  }
}
