import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function SideBar() {

    const [expand, setExpand] = useState(true)
    const navigate = useNavigate();

    const handleExpand = () =>{
        setExpand(!expand)
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name')
        localStorage.removeItem('role')
        localStorage.removeItem('id')
        navigate('/');
      };


  return (
    <div className='vh-100'>
      <aside className={`sidebar ${expand && "expand"}`}>
            <div className="d-flex mt-3">
            <button className="toggle-btn" type="button" onClick={handleExpand}>
            <img src={`${process.env.PUBLIC_URL}/favicon.ico.png`} alt="Icon" width="30" height="30" />
            </button>
                <div className="sidebar-logo">
                    <a className='link-text' href="/dashboard">Verso</a>
                </div>
            </div>
            <ul className="sidebar-nav">
                <li className="sidebar-item">
                    
                     <Link to="/dashboard" className="sidebar-link">
                     <i className="lni lni-grid-alt"></i>
                        <span className='link-text'>Dashboard</span>
                    </Link>
                </li>
               
                <li className="sidebar-item">
                <Link to="/joblist"  className="sidebar-link">
                        <i className="lni lni-agenda"></i>
                        <span className='link-text'>Jobs</span>
                    </Link>
                </li>


                <li className="sidebar-item">
                <Link to="/skills"  className="sidebar-link">
                        <i className="lni lni-popup"></i>
                        <span className='link-text' >Categories</span>
                    </Link>
                </li>

                {/* <li className="sidebar-item">
                    <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                        data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                        <i className="lni lni-protection"></i>
                        <span className='link-text' >Auth</span>
                    </a>
                    <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link link-text">Login</a>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link link-text">Register</a>
                        </li>
                    </ul>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                        data-bs-target="#multi" aria-expanded="false" aria-controls="multi">
                        <i className="lni lni-layout"></i>
                        <span className='link-text'  >Multi Level</span>
                    </a>
                    <ul id="multi" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link collapsed" data-bs-toggle="collapse"
                                data-bs-target="#multi-two" aria-expanded="false" aria-controls="multi-two">
                                Two Links
                            </a>
                            <ul id="multi-two" className="sidebar-dropdown list-unstyled collapse">
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link link-text">Link 1</a>
                                </li>
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link link-text">Link 2</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li> */}

            <li className="sidebar-item">
                <Link to="/ApplicationList"  className="sidebar-link">
                        <i className="lni lni-book"></i>
                        <span className='link-text' >Applications</span>
                    </Link>
                </li>
                
                <li className="sidebar-item">
                <Link to="/admin"  className="sidebar-link">
                        <i className="lni lni-files"></i>
                        <span className='link-text' >Add Admin</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                <Link to="/profile" className="sidebar-link">
                        <i className="lni lni-cog"></i>
                        <span className='link-text' >Setting</span>
                    </Link>
                </li>
            </ul>
            <div className="sidebar-footer">
                <a onClick={handleLogout}  className="sidebar-link">
                    <i className="lni lni-exit"></i>
                    <span className='link-text' >Logout</span>
                </a>
            </div>
        </aside>
    </div>
  )
}
