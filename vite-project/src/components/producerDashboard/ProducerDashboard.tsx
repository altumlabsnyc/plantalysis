import React from 'react';
import 'simple-datatables'; 
import 'simple-datatables/dist/style.css';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';
import 'https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js';
// js
import '../assets/dashboard/js/scripts.js';
import '../assets/dashboard/js/datatables-simple-demo.js';
// css
import '../assets/dashboard/css/styles.css'
import 'https://use.fontawesome.com/releases/v6.3.0/js/all.js';


const ProducerDashboard: React.FC = () => {
  return (
    <div>
      <title>Producer Dashboard | PLANTALYSIS by ALtum Labs</title>
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
          {/* Navbar */}
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-user fa-fw"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
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
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <div className="sb-sidenav-menu-heading">Core</div>
                  <a className="nav-link" href="/dashboard/producer/upload">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-tachometer-alt"></i>
                    </div>
                     Upload Sample Data
                  </a>
                  <a className="nav-link" href="/dashboard/producer/orders">
                    <div className="sb-nav-link-icon">
                      <i className ="fas fa-book-open"></i>
                    </div>
                     Current Orders
                  </a>
                  <a className="nav-link" href="/dashboard/producers/claim">
                    <div className="sb-nav-link-icon">
                    <i className ="fas fa-columns"></i>
                    </div>
                     Claim Lab Orders
                  </a>
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
              <div className="container-fluid px-4">
                <h1 className="mt-4">Data Approval</h1>
                <ol className="breadcrumb mb-4">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
                {/* table here */}
              </div>
            </main>
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">Copyright &copy; PLANTALYSIS by Altum Labs 2023</div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </div>
  );
};

export default ProducerDashboard;
