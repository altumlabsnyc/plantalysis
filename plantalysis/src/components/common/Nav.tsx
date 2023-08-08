// Nav.js
import React from 'react';
import logo from '@/components/assets/img/plantalysis.png';
import { Link } from 'react-router-dom';
import '@/components/assets/css/styles.css';

// The Nav component renders the navigation bar at the top of the page
const Nav = () => {
  return (
    // Navigation bar container with styling
    <nav
      id="nav-container"
      className="w-100 bg-white flex justify-between items-center px-4 font-dm-sans"
    >
      {/* Logo and brand name with a link to the homepage */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div id="logo-container" className="flex items-center">
          <img
            id="logo-img"
            src={logo}
            alt="Plantalysis Logo"
            className="w-12 h-12 mr-2 mt-2 mb-2"
          />
          <span className="text-xl font-bold">PLANTALYSIS</span>
        </div>
      </Link>
      {/* Secondary navigation container */}
      <div id="secondary-nav" className="xm-container small">
        {/* List of navigation items */}
        <ul className="flex list-none m-0 p-0">
          <li className="ml-2">
            {/* Link to the login page */}
            <a className="input-sans" href="/login">
              <button
                className="btn rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, #17fff7 0%, #74ffca 52.08%, #b1ffaf 100%)',
                }}
              >
                Login
              </button>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// Export the Nav component as the default export
export default Nav;
