import './../../assets/css/panel.css'

const BORDER_COLOR = '#D0D5DD'

interface DeliveryNotesProps {
    notes: string | null
}
export default function DeliveryNotes({
    notes
}: DeliveryNotesProps) {
    return <div
    className="panel-text"
    style={{
        width: '100%',
        height: '80px',
        padding: '0 33px',
        backgroundColor: '#FEFDFD',
        borderRadius: '20px',
        borderWidth: '2px',
        borderColor: BORDER_COLOR,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '16px'
    }}>
        <div style={{
            fontWeight: 500,
            fontSize: '22px'
        }}>Notes: </div>
        <div style={{
            fontWeight: 400,
            color: '#667085'
        }}>{notes}</div>
    </div>
}