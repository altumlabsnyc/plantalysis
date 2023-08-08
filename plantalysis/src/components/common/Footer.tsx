import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="site-footer overflow-hidden" role="contentinfo">
      <div>
        <div id="main-footer-content" className="row align-items-stretch">
          <footer
            id="main-footer-nav"
            className="bg-gray-light p-4 text-center"
          >
            <div className="container d-flex justify-content-between">
              <div className="font-size-mobile">
                {' '}
                <h1 className = "input-sans">&copy; 2023 Plantalysis</h1>
              </div>
              <div className="font-size-mobile">
                {' '}
                <Link to="/tos" className = "input-sans">Terms of Service</Link>
              </div>
              <div className="font-size-mobile">
                {' '}
                <Link to="/privacy" className = "input-sans">Privacy Statement</Link>
              </div>
              <div className="font-size-mobile">
                {' '}
                <Link to="/security" className = "input-sans">Security Statement</Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </footer>
  )
}

export default Footer
