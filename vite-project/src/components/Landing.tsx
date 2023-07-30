import './assets/css/styles.css'
import backgroundImage from './assets/img/hero.png'
import React from 'react'

function Hero() {
  const divStyle = {
    opacity: 0.4,
    background: `linear-gradient(180deg, #71F280 0%, #00B2727D 100%), url(${backgroundImage})`,
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    backgroundSize: 'cover',
  }
  return (
    <div
      className="video-opacity position-absolute w-100 h-100 z-index-top"
      style={divStyle}
    ></div>
  )
}

const Plantalysis: React.FC = () => {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="./styles.css" />
        <title>PLANTALYSIS by Altum Labs | NYC</title>
        <meta
          name="description"
          content="Learn how you can deliver exceptional frontline experiences, build high-performing teams and create products people love with Qualtrics XM."
        />
      </head>
      <body className="page-home">
        <div id="page" className="hfeed site bg-light">
          <div id="content" className="site-content bg-light en">
            <div>
              <nav id="nav-container" className="w-100 bg-white">
                <div id="secondary-nav" className="xm-container small">
                  <ul className="secondary-nav-container">
                    <li className="secondary-nav-item">
                      <a
                        className="secondary-nav-item-link input-sans"
                        href="/login"
                      >
                        Login
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
                          <h1 className="text-center headline-75 text-white bold text-shadow pt-5 mb-4">
                            Analysis. <br /> Done right.
                          </h1>
                          <div className="text-center">
                            <p className="text-center input-sans text-uppercase headline-15-alt text-white background-homepage round-5 d-inline-block pt-0 mb-3">
                              PLANTALYSIS PRD, LAB, AND REG ARE HERE Powered by
                              AI.
                            </p>
                          </div>
                          <div className="d-flex justify-content-center align-items-center my-5">
                            <button className="btn btn-white mt-0 mb-0 ">
                              REQUEST DEMO
                            </button>
                          </div>
                        </div>
                        <Hero />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="position-relative pt-2 overflow-hidden">
                <div className="xm-container">
                  <div className="row align-items-stretch">
                    <div className="col-12 border-card">
                      <div className="content h-100 position-relative overflow-hidden">
                        <div className="z-index-content position-relative h-100 w-100">
                          <h3 className="text-center input-sans text-uppercase headline-14 text-black pt-0 mb-2">
                            Welcome!
                          </h3>
                          <h2 className="text-center headline-32 text-black light pt-0 mb-4">
                            <strong>Powered by AI.</strong> Three suites to
                            solve your digital needs. Order fast compliance
                            testing, automate your molecular analysis, and get
                            regulatory approval for your products in real-time.{' '}
                            <strong>All on one platform.</strong>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div className="xm-container small">
                <div className="row justify-content-center row-cols-xl-3 row-cols-lg-2 row-cols-1">
                  <div className="col col-md-8 pl-xl-0 pr-xl-0 overflow-hidden border-card">
                    <div className="content h-100 d-flex flex-column bg-white default-homepage-padding">
                      <div className="bg-white border-card medium mb-0">
                        <p className="headline-13 input-sans mb-0 ">PRD for</p>
                        <h3 className="headline-28 text-frontline-gradient bold">
                          Cultivators and Processors
                        </h3>
                      </div>
                      <div className="pl-20 pr-20 ">
                        <p className="text-black">
                          Order compliance testing in under 1 minute. We take
                          care of the logistics so you can focus on what you do
                          best. Using AI, we automatically generate useful
                          documentation, such as double-blind test results,
                          CoAs, QR codes, and live status updates. For free.
                        </p>
                        <div className="pt-4 d-flex justify-content-start align-items-center pb-3">
                          <a className="btn btn-outline-black" href="/login">
                            Login
                          </a>
                          <a
                            className="btn-anchor anchor-black mb-0 ml-3"
                            href="/signup"
                          >
                            Sign Up
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col col-md-8 pr-xl-0 overflow-hidden border-card">
                    <div className="content h-100 d-flex flex-column bg-white default-homepage-padding">
                      <div className="bg-white border-card medium mb-0">
                        <p className="headline-13 input-sans mb-0 ">LAB FOR</p>
                        <h3 className="headline-28 text-culture-gradient bold">
                          Certified Laboratories
                        </h3>
                      </div>
                      <div className="pl-20 pr-20 ">
                        <p className="text-black">
                          AI-powered automation for your internal processes.
                          Accept testing orders with one click. Drag and drop
                          raw data into your order table and we automatically
                          turn it into CoAs for you. Reduce sample pickup hassle
                          with our route optimization feature.
                        </p>
                        <div className="pt-4 d-flex justify-content-start align-items-center pb-3">
                          <a className="btn btn-outline-black" href="/login">
                            Login
                          </a>
                          <a
                            className="btn-anchor anchor-black mb-0 ml-3"
                            href="/signup"
                          >
                            Sign Up
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col col-md-8 pr-xl-0 overflow-hidden border-card">
                    <div className="content h-100 d-flex flex-column bg-white default-homepage-padding">
                      <div className="bg-white border-card medium mb-0">
                        <p className="headline-13 input-sans mb-0 ">REG FOR</p>
                        <h3 className="headline-28 text-strategy-gradient bold">
                          Government
                        </h3>
                      </div>
                      <div className="pl-20 pr-20 ">
                        <p className="text-black">
                          Give your state’s consumers molecular-level peace of
                          mind. Plantalysis easily integrates into Metrc and
                          Biotrack to give your office the ability to approve
                          and reject samples at the batch-scale and broadcast
                          those results to consumers, all from one place.
                        </p>
                        <div className="pt-4 d-flex justify-content-start align-items-center pb-3">
                          <a className="btn btn-outline-black" href="/login">
                            Login
                          </a>
                          <a
                            className="btn-anchor anchor-black mb-0 ml-3"
                            href="/signup"
                          >
                            Sign Up
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <section className="position-relative">
                <div
                  className="xm-container small position-relative logo-bar-component d-none d-md-block pt-7"
                  style={{ zIndex: 200 }}
                >
                  <div className="row align-items-stretch">
                    <div className="col-12 border-card px-0 mb-0"></div>
                  </div>
                </div>
              </section>
              <section className="position-relative pt-0 pb-7">
                <div className="video-blade xm-plus-bg position-relative">
                  <div className="xm-container small pt-7 pb-4">
                    <div className="row align-items-center mt-3">
                      <div className="col-12 text-center mb-4">
                        <h1 className="text-center headline-75 text-black bold text-shadow pt-5 mb-4">
                          See more
                        </h1>
                        <p className="headline-17 text-black mb-4">
                          Hear from our partners, team members, and everyday
                          consumers who interact with our platform.
                          <br />
                          <br />
                          <a
                            className="btn-anchor text-black"
                            href="https://www.qualtrics.com/xmplus/xm-in-action/?utm_lp=homepage"
                            target=""
                          >
                            EXPLORE
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="position-relative pt-0 pb-0 overflow-hidden">
                <div className="xm-container small pt-4 pb-7">
                  <div className="row align-items-stretch">
                    <div className="col-12 col-md-5">
                      <h2 className="headline-30 bold mb-4">
                        Get started with your personalized demo
                      </h2>
                      <p className="pb-0">
                        Complete the form to see the platform in action. We’ll
                        show you how you can use Plantalysis to improve
                        experiences across your organization.
                      </p>
                    </div>
                    <div
                      className="col-12 col-md-6 offset-md-1 mt-5 mt-lg-0"
                      id="request-demo"
                    >
                      <div id="desktop-marketo-form-placeholder">
                        <div
                          id="marketo-embedded-form-container"
                          className="mt-n7 pt-7 text-black"
                        >
                          <form
                            id="personalized-demo-form"
                            className="marketo-universal-form needs-validation bg-gray-light text-black p-0 w-100"
                          >
                            <div className="form-content">
                              <h3 className="feature-module mt-0 mb-3">
                                Request Demo
                              </h3>
                              <div className="row">
                                <div className="col-md-6 form-group">
                                  <input
                                    id="personalized-demo-first"
                                    className="form-control"
                                    type="text"
                                    autoComplete="given-name"
                                    required
                                    placeholder=" "
                                  />
                                  <label htmlFor="personalized-demo-first">
                                    First Name *
                                  </label>
                                </div>
                                <div className="col-md-6 form-group">
                                  <input
                                    id="personalized-demo-last"
                                    className="form-control"
                                    type="text"
                                    autoComplete="family-name"
                                    required
                                    placeholder=" "
                                  />
                                  <label htmlFor="personalized-demo-last">
                                    Last Name *
                                  </label>
                                </div>
                                <div className="col-md-6 form-group">
                                  <input
                                    id="personalized-demo-company"
                                    className="form-control"
                                    type="text"
                                    autoComplete="organization"
                                    required
                                    placeholder=" "
                                  />
                                  <label htmlFor="personalized-demo-company">
                                    Company *
                                  </label>
                                </div>
                                <div className="col-md-6 form-group">
                                  <input
                                    id="personalized-demo-title"
                                    className="form-control"
                                    type="text"
                                    autoComplete="organization-title"
                                    required
                                    placeholder=" "
                                  />
                                  <label htmlFor="personalized-demo-title">
                                    Job Title *
                                  </label>
                                </div>
                                <div className="col-md-6 form-group">
                                  <input
                                    id="personalized-demo-email"
                                    className="form-control"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder=" "
                                  />
                                  <label htmlFor="personalized-demo-email">
                                    Business Email *
                                  </label>
                                </div>
                                <div className="col-md-6 form-group">
                                  <input
                                    id="personalized-demo-phone"
                                    className="form-control"
                                    type="tel"
                                    autoComplete="tel"
                                    required
                                    placeholder=" "
                                  />
                                  <label htmlFor="personalized-demo-phone">
                                    Phone Number *
                                  </label>
                                </div>
                                <div
                                  className="mt-3"
                                  style={{
                                    position: 'relative',
                                    height: '36px',
                                  }}
                                >
                                  <button
                                    type="submit"
                                    className="btn btn-outline-black mt-3"
                                    aria-label="Submit"
                                    style={{
                                      marginTop: '-89.1875px !important',
                                      position: 'absolute',
                                      bottom: 0,
                                    }}
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <footer className="site-footer overflow-hidden" role="contentinfo">
              <div className="xm-container text-left">
                <div
                  id="main-footer-content"
                  className="row align-items-stretch py-5 py-lg-6 "
                >
                  <div id="main-footer-nav" className="d-flex flex-wrap">
                    {/* Footer content */}
                  </div>
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

export default Plantalysis
