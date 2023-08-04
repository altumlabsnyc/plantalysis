import Panel from './Panel'

export default function OrderHistoryPanel() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Panel>
          <div
            style={{
              width: '607px',
            }}
          >
            Order History Table
          </div>
        </Panel>
      </div>
    </div>
  )
}
