import LabUpperPanels from '../LabUpperPanels'
import OrderHistoryPanel from '../OrderHistoryPanel'

export default function LabDashboardContent() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        gap: '20px',
        margin: '0 auto',
      }}
    >
      <LabUpperPanels />
      <OrderHistoryPanel />
    </div>
  )
}
