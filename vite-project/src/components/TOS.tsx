import './assets/css/styles.css'
import logo from './assets/img/plantalysis.png'
import React, { useEffect, useRef } from 'react'

const TOS: React.FC = () => {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="./styles.css" />
        <meta
          name="description"
          content="Learn how you can deliver exceptional frontline experiences, build high-performing teams and create products people love with Qualtrics XM."
        />
      </head>
      <body className="page-home">
        <div id="page" className="hfeed site bg-light">
          <div id="content" className="site-content bg-light en">
            <div>
              <nav
                id="nav-container"
                className="w-100 bg-white flex justify-between items-center px-4 font-dm-sans"
              >
                <div id="logo-container" className="flex items-center">
                  <img
                    src={logo}
                    alt="Plantalysis Logo"
                    className="w-12 h-12 mr-2 mt-2 mb-2"
                  />
                  <span className="text-xl font-bold">Plantalysis</span>
                </div>
                <div id="secondary-nav" className="xm-container small">
                  <ul className="flex list-none m-0 p-0">
                    <li className="ml-2">
                      <a className="input-sans" href="/login">
                        <button className="btn btn-white mt-0 mb-0">
                          Login
                        </button>
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
              <section className="position-relative pb-3 overflow-hidden">
                <div className="xm-container">
                  <div className="row align-items-stretch">
                    <div className="col-12 border-card video-banner rounded-banner">
                      <div className="content default-large-padding rounded-banner h-100 position-relative overflow-hidden">
                        <div className="z-index-content position-relative h-100 w-100">
                          <h1 className="text-center headline-75 text-black bold text-shadow pt-5 mb-4">
                            Terms of Service <br/>
                          </h1>
                          <center>
                            <h3>
                            Coming Soon...
                            </h3>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br/><br/>
             </section>

            </div>
            <footer className="site-footer overflow-hidden" role="contentinfo">
              <div className="xm-container text-left">
                <div
                  id="main-footer-content"
                  className="row align-items-stretch py-5 py-lg-6 "
                >
                  <footer
                    id="main-footer-nav"
                    className="bg-gray-light p-4 text-center"
                  >
                    <div className="container d-flex justify-content-between">
                      <div style={{ fontSize: '1.5rem' }}>
                        &copy; 2023 Plantalysis
                      </div>
                      <div style={{ fontSize: '1.5rem' }}>
                        <a href="#">Terms of Service</a>
                      </div>
                      <div style={{ fontSize: '1.5rem' }}>
                        <a href="#">Privacy Statement</a>
                      </div>
                      <div style={{ fontSize: '1.5rem' }}>
                        <a href="#">Security Statement</a>
                      </div>
                    </div>
                  </footer>
                </div>
                <div className="gradient-bar w-100"></div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}

export default TOS
