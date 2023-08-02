import './assets/css/styles.css'
import logo from './assets/img/plantalysis.png'
import React, { useEffect, useRef } from 'react'

const Privacy: React.FC = () => {
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
              <section className="position-relative pb-3 overflow-hidden">
                <div className="xm-container">
                  <div className="row align-items-stretch">
                    <div className="col-12 border-card video-banner rounded-banner">
                      <div className="content default-large-padding rounded-banner h-100 position-relative overflow-hidden">
                        <div className="z-index-content position-relative h-100 w-100">
                          <h1 className="text-center headline-75 text-black bold text-shadow pt-5 mb-4">
                            Privacy Policy <br />
                          </h1>
                          <center>
                            <h3>Coming Soon...</h3>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <br />
              </section>
          </div>
        </div>
      </body>
    </html>
  )
}

export default Privacy
