import Panel from '../../Panel'

import './../../assets/css/panel.css'
import DeliveryIcon from './../../assets/svg/delivery.svg'

import { LabOrder } from '@/types/supabaseAlias'
import formatDate from '@/utils/dateFormatter'
import SeparationBar from './SeparationBar'
import OrderStatusBar from './OrderStatusBar'
import SampleDetails from './SampleDetails'
import DeliveryNotes from './DeliveryNotes'
import DeliveryDetails from './DeliveryDetails'
import PaymentDetails from './PaymentDetails'

interface RequestDetailPanel {
  activeLabOrder: LabOrder | null
}

export default function RequestDetailPanel({
  activeLabOrder,
}: RequestDetailPanel) {
  return (
    <Panel>
      <div
        style={{
          width: '500px',
          fontFamily: 'Poppins',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          padding: '6px 6px',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <p className="panel-title">
            Order Request:{' '}
            <span className="panel-subtitle">{activeLabOrder?.id}</span>
          </p>
          <div>Approve Request</div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '14px',
            alignItems: 'center',
            marginBottom: '-15px',
          }}
        >
          <div>
            <span style={{ color: '#667085' }}>Order Date: </span>
            <span style={{ fontWeight: 600 }}>
              {activeLabOrder ? formatDate(activeLabOrder.order_time) : '0000'}
            </span>
          </div>
          <SeparationBar />
          <div
            className="panel-subtitle"
            style={{
              fontWeight: 600,
              display: 'flex',
              flexDirection: 'row',
              gap: '14px',
            }}
          >
            <img src={DeliveryIcon} />
            {'Turnaround: ' + 'Jan 1, 1900'}
          </div>
        </div>
        <SeparationBar horizontal />
        <OrderStatusBar />
        <SampleDetails />
        <DeliveryNotes notes={'Delivery to Unit 3, Turnaround ASAP'} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <DeliveryDetails
            address={'123 Brooklyn Bridge, New York, NY'}
            contactInfo={'123-333-8000'}
          />
          <PaymentDetails paymentMethod="VISA" last2Digits="56" />
        </div>
      </div>
    </Panel>
  )
}
