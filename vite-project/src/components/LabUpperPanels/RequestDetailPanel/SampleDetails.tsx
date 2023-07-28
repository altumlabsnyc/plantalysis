import './../../assets/css/panel.css'
import SeparationBar from './SeparationBar'

const BORDER_COLOR = '#D0D5DD'

export default function SampleDetails() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '0 3px',
      }}
    >
      <div
        style={{
          borderColor: BORDER_COLOR,
          borderRadius: '20px',
          borderWidth: '2px',
          overflow: 'hidden',
        }}
      >
        <img
          src={
            'https://swbiodiversity.org/imglib/seinet/midwest/IND_Observations/202111/Canabis_sativa_0908e_1637189237.jpg'
          }
          style={{
            width: '90px',
            height: '90px',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <div
            className="panel-text"
            style={{
              fontWeight: 400,
              fontSize: '22px',
            }}
          >
            Blue Drea Sativa
          </div>
          <div
            className="panel-text"
            style={{
              fontWeight: 600,
              fontSize: '19px',
            }}
          >
            Cannabinoid Profiling
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
            color: '#667085',
          }}
        >
          <div className="panel-text">Herbal Remedy</div>
          <SeparationBar width="1px" />
          <div className="panel-text">{'Batch ID: ' + 'ALTM20230714-001'}</div>
          <SeparationBar width="1px" />
          <div className="panel-text">3 oz.</div>
        </div>
      </div>
    </div>
  )
}
