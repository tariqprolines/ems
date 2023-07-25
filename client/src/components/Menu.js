import React from 'react'
import { Link } from 'react-router-dom'


function Menu() {
  return (
  <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Employee Management</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
         <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
         <Link className="nav-link" to="/about">About</Link>
        </li>
        <li className="nav-item">
         <Link className="nav-link" to="/create-employee">Create Employee</Link>
        </li>
        <li className="nav-item">
         <Link className="nav-link" to="/contact-us">Contact Us</Link>
        </li>
      </ul>
      <span className='d-flex'>
        <Link className='me-2 text-white text-decoration-none' to="/register">Register</Link> / 
        <Link className='text-white text-decoration-none' to="/login">Login</Link> / 
        <Link className='text-white text-decoration-none' to="/logout">Logout</Link>
      </span>
      {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>
  )
}

export default Menu