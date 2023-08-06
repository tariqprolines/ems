import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

 const Menu = () =>{
  const auth = localStorage.getItem('jwt');
  const user = localStorage.getItem('user')
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

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
         <Link className="nav-link active" aria-current="page" to="/about">About</Link>
        </li>
        {auth &&
        <>
        <li className="nav-item">
        <Link className="nav-link" to="/employee-list">Employees List</Link>
       </li>
       <li className="nav-item">
        <Link className="nav-link" to="/create-employee">Create Employee</Link>
       </li>
        </>
        }
        
        <li className="nav-item">
         <Link className="nav-link" to="/contact-us">Contact Us</Link>
        </li>
      </ul>
      <span className='d-flex'>
        { auth?
          <>
          <span className='text-white text-decoration-none mx-4'>Welcome to ({user})</span>
          <Link className='text-white text-decoration-none' onClick={logout} to="/">Logout</Link>
          </>
          :<>
          <Link className='me-2 text-white text-decoration-none' to="/register">Register</Link> / 
          <Link className='text-white text-decoration-none' to="/">Login</Link> 
          </>
        }
      </span>
    </div>
  </div>
</nav>
  )
}

export default Menu