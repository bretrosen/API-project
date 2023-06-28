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
            <div className='nav-menu-center'>
                <div className='center-1'>Anywhere</div>
                <div className='center-2'>Any week</div>
                <div className='center-3'>Add guests</div>
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className='nav-wrapper-right'>
                <NavLink className='create-spot-text' to='/spots/new'>Bookfairbnb your home</NavLink>
                <button className='settings-button' onClick={() => { return alert('Feature coming soon...') }}>
                    <i className="fa-solid fa-globe"></i>
                </button>
                <div>
                    {isLoaded && (
                        <li>
                            <ProfileButton user={sessionUser} />
                        </li>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navigation;
