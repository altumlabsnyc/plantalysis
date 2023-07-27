import OrderRequestPanel from './OrderRequestsPanel'
import RequestDetailPanel from './RequestDetailPanel'
import UploadPanel from './UploadPanel'

export default function LabUpperPanels() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '30px',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'stretch',
        }}
      >
        <OrderRequestPanel />
        <UploadPanel />
      </div>
      <RequestDetailPanel />
    </div>
  )
}
