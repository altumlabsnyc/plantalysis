import { Link } from 'react-router-dom';

const Footer = () => {
    return (
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
                        {/* <a href="#">Terms of Service</a> */}
                        <Link to="/tos">Terms of Service</Link>                                             

                      </div>
                      <div style={{ fontSize: '1.2rem' }}>
                        {/* <a href="#">Privacy Statement</a> */}
                        <Link to="/privacy">Privacy Statement</Link>
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
    );
}
export default Footer;