import React from "react"

export type DashboardPanel = {
  link: string
  icon: React.ReactNode
  text: string
}

interface DashboardProps {
  children: React.ReactNode
  role: string
  panels: DashboardPanel[]
}

export default function Dashboard({ children, role, panels }: DashboardProps) {
  return (
    <div>
      <title>{role + " Dashboard | PLANTALYSIS by ALtum Labs"}</title>
      <body className="sb-nav-fixed">
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          {/* Navbar Brand */}
          <a className="navbar-brand ps-3" href="/">
            PLANTALYSIS
          </a>
          {/* Navbar Search */}
          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            {/* <div className="input-group">
              <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
              <button className="btn btn-primary" id="btnNavbarSearch" type="button">
                <i className="fas fa-search"></i>
              </button>
            </div> */}
          </form>
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user fa-fw"></i>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#!">
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav
              className="sb-sidenav accordion sb-sidenav-dark"
              id="sidenavAccordion"
            >
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <div className="sb-sidenav-menu-heading">Core</div>
                  {panels.map(({ link, icon, text }) => (
                    <a className="nav-link" href={link}>
                      <div className="sb-nav-link-icon">{icon}</div>
                      {text}
                    </a>
                  ))}
                </div>
              </div>
              <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Producer Name User
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">{children}</div>
            </main>
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">
                    Copyright &copy; PLANTALYSIS by Altum Labs 2023
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </div>
  )
}
