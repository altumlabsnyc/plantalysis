import './../assets/css/styles.css'
import backgroundImage from './assets/img/hero.png'
import backgroundVideo from './../assets/vid/BGV_480p.mp4'
import logo from './../assets/img/newPlantalysis.png'
import React, { useEffect, useRef } from 'react'
import ImageCarousel from './ImageCarousel'
import AL from './../assets/img/newLogo.png'

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('error playing video:', error)
      })
    }
  }, [])

  const videoStyle: React.CSSProperties = {
    objectFit: 'cover',
    opacity: 1.0,
  }

  return (
    <video
      ref={videoRef}
      className="position-absolute w-100 h-100 z-index-top top-0 left-0"
      style={videoStyle}
      muted
      loop
    >
      <source src={backgroundVideo} type="video/mp4" />
    </video>
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
                      <a className="btn btn-outline-black" href="/login">
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
                          <h1
                            className="text-center headline-75 text-white bold text-shadow pt-5 mb-4"
                            style={{
                              textShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
                              willChange: 'transform',
                            }}
                          >
                            Analysis. <br /> Done Right.
                          </h1>
                          <div className="text-center">
                            <p className="text-center input-sans text-uppercase headline-15-alt text-black background-homepage round-5 d-inline-block pt-0 mb-3">
                              PLANTALYSIS PRD, LAB, AND REG ARE HERE Powered by
                              AI.
                            </p>
                          </div>
                          <div className="d-flex justify-content-center align-items-center my-5">
                            <a
                              className="btn btn-white btn-outline-black"
                              href="/login"
                            >
                              Request Demo
                            </a>
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
                          <h2 className="text-center headline-32 text-black pt-0 mb-4">
                            <strong>Powered by AI.</strong> Three suites to
                            solve your digital needs. Order fast
                            <br />
                            compliance testing, automate your molecular
                            analysis, and get <br /> regulatory approval for
                            your products in real-time.{' '}
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
                            href="/register"
                            target="_blank"
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
                            href="/register"
                            target="_blank"
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
                            href="/register"
                            target="_blank"
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
                  <div className="xm-container small pt-3 pb-3">
                    <div className="row align-items-center mt-3">
                      {/* Add padding/margin to the top of the h1 element */}
                      <h1 className="text-center headline-20 text-black bold text-shadow pt-3 mb-2">
                        Plantalysis&trade; is a product of:
                      </h1>
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        {/* Add padding/margin to the top of the div containing the image */}
                        <img
                          src={AL}
                          alt="Altum Labs"
                          style={{
                            width: '25%',
                            height: 'auto',
                            marginTop: '10px',
                          }}
                        />
                      </div>
                      <div className="col-12 text-center mt-4 mb-4">
                        <h1 className="text-center headline-50 text-black bold text-shadow pt-5 mb-4">
                          SEE MORE
                        </h1>
                        <p className="headline-17 text-black mb-5">
                          Hear from our partners, team members, and
                          <br />
                          everyday consumers who interact with our platform.
                          <br />
                          <br />
                          <a
                            className="btn-anchor text-black"
                            href="https://www.altumlabs.co"
                            target="_blank"
                            rel="noreferrer"
                          >
                            EXPLORE
                          </a>
                        </p>
                      </div>
                    </div>
                    <ImageCarousel />
                  </div>
                </div>
              </section>
              <section className="position-relative pt-0 pb-0 overflow-hidden">
                <div className="xm-container small pt-4 pb-7">
                  <div className="row align-items-stretch">
                    <div className="col-12 col-md-5">
                      <h2 className="headline-40 bold mb-4">
                        Get started with
                        <br />
                        your personalized demo
                      </h2>
                      <br />
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
                            className="marketo-universal-form needs-validation  text-black p-0 w-100 text-center"
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
                                    &nbsp; First Name *
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
                                    &nbsp; Last Name *
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
                                    &nbsp; Company *
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
                                    &nbsp; Job Title *
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
                                    &nbsp; Business Email *
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
                                    &nbsp; Phone Number *
                                  </label>
                                </div>
                                {/* <div className="col-md-12 form-group">
                                  <input
                                    id="personalized-demo-phone"
                                    className="form-control"
                                    type="tel"
                                    autoComplete="tel"
                                    required
                                    placeholder=" "
                                  />
                                  <label htmlFor="personalized-demo-phone">
                                    &nbsp; State *
                                  </label>
                                </div> */}
                                <div className="col-md-12 form-group mt-2">
                                  <div className="w-100">
                                    <label
                                      htmlFor="personalized-demo-state"
                                      className="mb-0"
                                    >
                                      &nbsp; State *
                                    </label>
                                    <select
                                      id="personalized-demo-state"
                                      className="form-control"
                                      required
                                    >
                                      <option value="" disabled selected>
                                        Select State
                                      </option>
                                      <option value="AL">Alabama</option>
                                      <option value="AK">Alaska</option>
                                      <option value="AZ">Arizona</option>
                                      <option value="AR">Arkansas</option>
                                      <option value="CA">California</option>
                                      <option value="CO">Colorado</option>
                                      <option value="CT">Connecticut</option>
                                      <option value="DE">Delaware</option>
                                      <option value="FL">Florida</option>
                                      <option value="GA">Georgia</option>
                                      <option value="HI">Hawaii</option>
                                      <option value="ID">Idaho</option>
                                      <option value="IL">Illinois</option>
                                      <option value="IN">Indiana</option>
                                      <option value="IA">Iowa</option>
                                      <option value="KS">Kansas</option>
                                      <option value="KY">Kentucky</option>
                                      <option value="LA">Louisiana</option>
                                      <option value="ME">Maine</option>
                                      <option value="MD">Maryland</option>
                                      <option value="MA">Massachusetts</option>
                                      <option value="MI">Michigan</option>
                                      <option value="MN">Minnesota</option>
                                      <option value="MS">Mississippi</option>
                                      <option value="MO">Missouri</option>
                                      <option value="MT">Montana</option>
                                      <option value="NE">Nebraska</option>
                                      <option value="NV">Nevada</option>
                                      <option value="NH">New Hampshire</option>
                                      <option value="NJ">New Jersey</option>
                                      <option value="NM">New Mexico</option>
                                      <option value="NY">New York</option>
                                      <option value="NC">North Carolina</option>
                                      <option value="ND">North Dakota</option>
                                      <option value="OH">Ohio</option>
                                      <option value="OK">Oklahoma</option>
                                      <option value="OR">Oregon</option>
                                      <option value="PA">Pennsylvania</option>
                                      <option value="RI">Rhode Island</option>
                                      <option value="SC">South Carolina</option>
                                      <option value="SD">South Dakota</option>
                                      <option value="TN">Tennessee</option>
                                      <option value="TX">Texas</option>
                                      <option value="UT">Utah</option>
                                      <option value="VT">Vermont</option>
                                      <option value="VA">Virginia</option>
                                      <option value="WA">Washington</option>
                                      <option value="WV">West Virginia</option>
                                      <option value="WI">Wisconsin</option>
                                      <option value="WY">Wyoming</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-12 text-center">
                                  <div
                                    className="mt-3"
                                    style={{
                                      position: 'relative',
                                      height: '24px',
                                    }}
                                  >
                                    <button
                                      type="submit"
                                      className="btn btn-outline-black mt-3"
                                      aria-label="Submit"
                                    >
                                      Submit
                                    </button>
                                  </div>
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
                  <footer
                    id="main-footer-nav"
                    className="bg-gray-light p-4 text-center"
                  >
                    <div className="container d-flex justify-content-between">
                      <div style={{ fontSize: '1.2rem' }}>
                        &copy; 2023 Plantalysis
                      </div>
                      <div style={{ fontSize: '1.2rem' }}>
                        <a href="#">Terms of Service</a>
                      </div>
                      <div style={{ fontSize: '1.2rem' }}>
                        <a href="#">Privacy Statement</a>
                      </div>
                      <div style={{ fontSize: '1.2rem' }}>
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

export default Plantalysis
