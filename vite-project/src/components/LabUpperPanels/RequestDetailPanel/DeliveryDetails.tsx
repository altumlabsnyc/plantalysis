import './../../assets/css/panel.css'

const DETAILS_STYLE: React.CSSProperties = {
    color: '#667085',
    fontWeight: 500
}

interface DeliveryDetailsProps {
    address: string
    contactInfo: string
}

export default function DeliveryDetails({
    address,
    contactInfo
}: DeliveryDetailsProps) {
    return <div className='panel-text'>
        <div
            style={{
                fontSize: '19px',
                fontWeight: 500,
                marginBottom: '17px'
            }}>
            Delivery
        </div>
        <div style={{...DETAILS_STYLE, marginBottom: '10px'}}>
            {address}
        </div>
        <div style={DETAILS_STYLE}>
            {'Contact Information: ' + contactInfo}
        </div>
    </div>
}