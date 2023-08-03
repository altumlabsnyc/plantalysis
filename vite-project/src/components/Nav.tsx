// Nav bar used in landing page and legal pages
import logo from './assets/img/plantalysis.png'
import { Link } from 'react-router-dom'
import './assets/css/styles.css'

const Nav = () => {
  return (
    <nav
    id="nav-container"
    className="w-100 bg-white flex justify-between items-center px-4 font-dm-sans"
    >
        <Link to="/" style={{ textDecoration: 'none'}}>
        <div id="logo-container" className="flex items-center" style ={{textDecoration: 'none'}}>
            <img
            src={logo}
            alt="Plantalysis Logo"
            className="w-12 h-12 mr-2 mt-2 mb-2"
            />
            <span className="text-xl font-bold" style ={{textDecoration: 'none'}}>Plantalysis</span>
        </div>
        </Link>
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
  );
}

export default Nav;