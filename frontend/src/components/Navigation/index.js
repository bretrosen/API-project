import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    // let sessionLinks;
    // if (sessionUser) {
    //     sessionLinks = (
    //         <li>
    //             <ProfileButton user={sessionUser} />
    //         </li>
    //     );
    // } else {
    //     sessionLinks = (

    //     );
    // }

    return (
        <div className='nav-wrapper'>
                <a className='nav-logo' href='/'>
                    <i className="fa-solid fa-book-atlas" />
                    &nbsp; bookfairBnb
                </a>
            {sessionUser &&
                <div className='nav-create-spot-text'>
                    <NavLink to='/spots/new'>Create a New Spot</NavLink>
                </div>}
            <div className='nav-menu'>
                {isLoaded &&  (
                    <li>
                        <ProfileButton user={sessionUser} />
                    </li>
                )}
            </div>
        </div>
    );
}

export default Navigation;
