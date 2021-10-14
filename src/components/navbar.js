import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {

    const NavLink = (props) => {
        return (
            <div className='nav-link'>
                <Link to={props.path} className='nav-button'>{props.name}</Link>
            </div>
        )
    }

    return (
        <nav className='nav'>
            <h2 className='nav-title'>Employee Management</h2>
            <div className='nav-links'>
                
                { props.user.token ? <NavLink path='/' name="View Employees"/> : null }
                { props.user.token ? <NavLink path='/projects' name="View Projects"/> : null }
                { props.user.isAdmin ? <NavLink path='/register' name="Create account"/> : null }
                { props.user.token ? <div className='nav-link' onClick={() => { props.logout() }}><div className='nav-button'>Logout</div></div> : null }
                
            </div>
        </nav>
    );
}

export default Navbar;