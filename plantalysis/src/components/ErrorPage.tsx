import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { Link } from 'react-router-dom'
import errorImg from './assets/img/404.png'

export default function Custom404() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <img
        src={errorImg}
        alt="Background image for 404 page"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <h1
          style={{
            fontFamily: 'monospace',
            fontSize: '10rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '0.5rem',
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontFamily: 'monospace',
            fontSize: '2rem',
            color: 'white',
            marginTop: '0.5rem',
          }}
        >
          PAGE NOT FOUND
        </h2>
        <div style={{ textAlign: 'center' }}>
          <Link to="/">
            <p
              style={{
                fontFamily: 'monospace',
                backgroundColor: '#CFAA41',
                padding: '10px 20px',
                borderRadius: '30px',
                color: 'white',
                fontSize: '1rem',
                textDecoration: 'none',
                marginTop: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '200px',
              }}
            >
              Go Back
              <ArrowForwardRoundedIcon
                sx={{ fontSize: 20, marginLeft: '10px' }}
              />
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
