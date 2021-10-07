import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='nav'>
            <h2 className='nav-title'>Employee Management</h2>
            <div className='nav-links'>
                {/* <NavLink to='/add/employee' className='nav-link'>
                    Add Employee
                </NavLink>
                <NavLink to='/add/project' className='nav-link'>
                    Add Project
                </NavLink> */}
                <div className='nav-link'>
                    <Link to='/' className='nav-button'>View Employees</Link>
                </div>
                <div className='nav-link'>
                    <Link to='/projects' className='nav-button'>View Projects</Link>
                </div>
                
            </div>
        </nav>
    );
}

export default Navbar;