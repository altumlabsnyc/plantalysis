import logo from './assets/img/plantalysis.png'

const Nav = () => {
  return (
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
  );
}

export default Nav;