import './../../assets/css/panel.css'
import VISALogo from './../../assets/svg/visa-logo.svg'

const DETAILS_STYLE: React.CSSProperties = {
  color: '#667085',
  fontWeight: 400,
}

interface PaymentDetailsProps {
  paymentMethod: string
  last2Digits: string
}

export default function PaymentDetails({
  paymentMethod,
  last2Digits,
}: PaymentDetailsProps) {
  return (
    <div className="panel-text">
      <div
        style={{
          fontSize: '19px',
          fontWeight: 600,
        }}
      >
        Payment
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div style={DETAILS_STYLE}>{paymentMethod + ' **' + last2Digits}</div>
        <div
          style={{
            height: '30px',
            width: '66px',
            borderRadius: '5px',
            borderColor: '#F2F4F7',
            borderWidth: '1px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={VISALogo}
            style={{
              height: '15px',
            }}
          />
        </div>
      </div>
    </div>
  )
}
