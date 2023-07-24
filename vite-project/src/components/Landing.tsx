import React from "react";
// css
import "./assets/landing/vendor/swiper/swiper-bundle.min.css";
import "./assets/landing/css/style.css";
import "./assets/landing/vendor/remixicon/remixicon.css";
import "./assets/landing/vendor/glightbox/css/glightbox.min.css";
import "./assets/landing/vendor/boxicons/css/boxicons.min.css";
import "./assets/landing/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/landing/vendor/bootstrap/css/bootstrap.min.css";
// js
// import "./assets/landing/vendor/purecounter/purecounter_vanilla.js";
// import "./assets/landing/vendor/bootstrap/js/bootstrap.bundle.min.js";
// import "./assets/landing/vendor/glightbox/js/glightbox.min.js";
// import "./assets/landing/vendor/isotope-layout/isotope.pkgd.min.js";
// import "./assets/landing/vendor/swiper/swiper-bundle.min.js";
// import "./assets/landing/vendor/php-email-form/validate.js";
// import "./assets/landing/js/main.js";
// imgs
import BG1 from "./assets/landing/img/BG.png";
import BG2 from "./assets/landing/img/BG2.png";
import BG3 from "./assets/landing/img/BG3.png";
import logo from "./assets/landing/img/logo.png";

const Plantalysis: React.FC = () => {
  return (
    <div>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>PLANTALYSIS by Altum Labs</title>
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      {/* Favicons */}
      <link rel="icon" href="assets/img/favicon.png" />
      <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png" />
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap"
        rel="stylesheet"
      />
      {/* ======= Header ======= */}
      <header id="header" className="fixed-top">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-9 d-flex align-items-center justify-content-lg-between">
              <a href="https://altumlabs.co" target = "_blank" className="logo me-auto me-lg-0">
                <img src={logo} alt="" className="img-fluid" />
              </a>
              <nav id="navbar" className="navbar order-last">
                <ul>
                  <li>
                    <a className="nav-link" href="#hero">
                      Home
                    </a>
                  </li>
                </ul>
                <a
                  href="/login"
                  style={{ color: "white" }}
                  className="get-started-btn scrollto"
                >
                  Login
                </a>

                <a
                  href="/register"
                  style={{ color: "white" }}
                  className="get-started-btn scrollto"
                >
                  Register
                </a>

                <i className="bi bi-list mobile-nav-toggle"></i>
              </nav>
              {/* .navbar */}
            </div>
          </div>
        </div>
      </header>
      {/* End Header */}
      {/* ======= Hero Section ======= */}
      <section id="hero" className="d-flex flex-column justify-content-center">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <center>
              <div className="col-xl-9">
                <h1>P L A N T A L Y S I S</h1>
                <h3>Know what's inside.</h3>
                <br />
                <div className="row" style={{ whiteSpace: "nowrap" }}>
                  <div className="col">
                    <ul style={{ textAlign: "left" }}>
                      <li>Comprehensive Data Protection</li>
                      <li>Automated Molecular Analysis</li>
                      <li>AI-powered Compound Quantification</li>
                    </ul>
                  </div>
                  <div className="col">
                    <ul style={{ textAlign: "left" }}>
                      <li>Accredited Laboratory Marketplace</li>
                      <li>Step-by-Step Process Tracking</li>
                      <li>Live Sample-Level Regulator Approval</li>
                    </ul>
                  </div>
                  <div className="col">
                    <ul style={{ textAlign: "left" }}>
                      <li>QR-Accessible Test Results</li>
                      <li>OCM-Compliant Label Generator</li>
                      <li>Consumer Insights Analytics</li>
                    </ul>
                  </div>
                </div>
                <br />
                <a href="#contact" className="get-started-btn">
                  Contact Us
                </a>
              </div>
            </center>
          </div>
        </div>
      </section>
      {/* End Hero */}
      <main id="main">
        {/* ======= Pricing Section ======= */}
        <section id="pricing" className="pricing">
          <div className="container">
            <center>
              <h2 style={{ color: "#335E50" }}>Welcome!</h2>
              <p>
                Sign Up or Log In to access the innovative platform that makes
                your compliance processes frictionless.
              </p>
            </center>
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="box">
                  <div className="col-lg">
                    <img className="rounded-circle" src={BG1} alt="" />
                  </div>
                  <h3 style={{ color: "#335E50", fontSize: "25px" }}>LABS</h3>
                  <div className="btn-wrap">
                    <a href="/login" className="btn-fill">
                      Login
                    </a>
                  </div>
                  <div className="btn-wrap">
                    <a href="/register" className="btn-buy">
                      Register
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
                <div className="box">
                  <div className="col-lg">
                    <img className="rounded-circle" src={BG2} alt="" />
                  </div>
                  <h3 style={{ color: "#335E50", fontSize: "25px" }}>
                    PRODUCER
                  </h3>
                  <div className="btn-wrap">
                    <a href="/login" className="btn-fill">
                      Login
                    </a>
                  </div>
                  <div className="btn-wrap">
                    <a href="/register" className="btn-buy">
                      Register
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                <div className="box">
                  <div className="col-lg">
                    <img className="rounded-circle" src={BG3} alt="" />
                  </div>
                  <h3 style={{ color: "#335E50", fontSize: "25px" }}>
                    REGULATOR
                  </h3>
                  <div className="btn-wrap">
                    <a href="/login" className="btn-fill">
                      Login
                    </a>
                  </div>
                  <div className="btn-wrap">
                    <a href="/register" className="btn-buy">
                      Register
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Pricing Section */}
        {/* ======= Contact Section ======= */}
        <section id="contact" className="contact">
          <div className="container">
            <center>
              <h2>Contact</h2>
              <p>We want to hear from you.</p>
            </center>
          </div>
          <div className="container">
            <div className="row mt-5">
              <center>
                <div className="col-lg-8 mt-5 mt-lg-0">
                  <form
                    action="forms/contact.php"
                    method="post"
                    role="form"
                    className="php-email-form"
                  >
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                          required
                        />
                      </div>
                      <div className="col-md-6 form-group mt-3 mt-md-0">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Your Email"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        id="subject"
                        placeholder="Subject"
                        required
                      />
                    </div>
                    <div className="form-group mt-3">
                      <textarea
                        className="form-control"
                        name="message"
                        rows={5}
                        placeholder="Message"
                        required
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <div className="loading">Loading</div>
                      <div className="error-message"></div>
                      <div className="sent-message">
                        Your message has been sent. Thank you!
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="submit">Send Message</button>
                    </div>
                  </form>
                </div>
              </center>
            </div>
          </div>
        </section>
        {/* End Contact Section */}
      </main>
      {/* End #main */}
      {/* ======= Footer ======= */}
      <footer id="footer">
        <div className="container">
          <h3>P L A N T A L Y S I S</h3>
          <h4>by Altum Labs</h4>
          <p>Ensuring your wellness, empowering, consumer trust.</p>
          <div className="social-links">
            <a href="#" className="twitter">
              <i className="bx bxl-twitter"></i>
            </a>
            <a href="#" className="instagram">
              <i className="bx bxl-instagram"></i>
            </a>
            <a href="#" className="linkedin">
              <i className="bx bxl-linkedin"></i>
            </a>
          </div>
          <div className="copyright">
            {" "}
            &copy; Copyright{" "}
            <strong>
              <span>Altum Labs</span>
            </strong>
            . All Rights Reserved{" "}
          </div>
        </div>
      </footer>
      {/* End Footer */}

      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
};

export default Plantalysis;
