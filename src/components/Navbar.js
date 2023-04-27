import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'
import './components.css'


const Navbar = (props) => {
  let navigate = useNavigate();
  let location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("ismtoken");
    localStorage.removeItem("ismname");
    navigate('/login');

  }
  useEffect(() => {
    if (location.pathname !== ("/" || "/about")) {
      localStorage.removeItem("istoken");
      localStorage.removeItem("ismname");

    }
  }, [location.pathname])


  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <span>  <img className='logo' src={logo} alt="" />
            <Link className="navbar-brand " to="/">  iSmartbook</Link> </span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>


            </ul>
            {!localStorage.getItem("ismtoken") && location.pathname != '/' ?
              <form className="d-flex" role="search">

                <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
              </form> : <> <button onClick={handleLogout} className='btn btn-primary'>Logout</button> {localStorage.getItem("name")}</>
            }
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar