import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer overflow-hidden" role="contentinfo">
      <div className="xm-container text-left">
        <div id="main-footer-content" className="row align-items-stretch">
          <footer id="main-footer-nav" className="bg-gray-light p-4 text-center">
            <div className="container d-flex justify-content-between">
              <div className="font-size-mobile"> {/* Larger font size on desktop */}
                <h1>&copy; 2023 Plantalysis</h1>
              </div>
              <div className="font-size-mobile"> {/* Smaller font size on mobile */}
                <Link to="/tos">Terms of Service</Link>
              </div>
              <div className="font-size-mobile"> {/* Smaller font size on mobile */}
                <Link to="/privacy">Privacy Statement</Link>
              </div>
              <div className="font-size-mobile"> {/* Smaller font size on mobile */}
                <Link to="/security">Security Statement</Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
