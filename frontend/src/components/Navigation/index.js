import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='nav-wrapper'>
            <NavLink className='nav-logo' to='/'>
                <i className="fa-solid fa-book-atlas" />
                &nbsp; bookfairBnb
            </NavLink>
            <div className='nav-create-spot-text'>
                <NavLink className='create-spot-text' to='/spots/new'>Create a New Spot &nbsp;&nbsp;</NavLink>
                <i className="fa-solid fa-globe"></i>
            </div>

            <div className='nav-menu'>
                {isLoaded && (
                    <li>
                        <ProfileButton user={sessionUser} />
                    </li>
                )}
            </div>
        </div>
    );
}

export default Navigation;
