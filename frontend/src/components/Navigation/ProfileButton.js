import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './Navigation.css';


const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    const logout = (event) => {
        event.preventDefault();
        dispatch(sessionActions.logoutThunk());
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <div className='nav-right-menu'>
            <i className='fa-solid fa-bars' />
            <button className='profile-menu' onClick={openMenu}>
                <i className="fa-regular fa-compass" />
                {/* <i className="fa-solid fa-book-atlas" /> */}
            </button>
            </div>
            <ul className={ulClassName} ref={ulRef}>
                <li>Hello, {user.firstName}</li>
                <li>{user.email}</li>
                <li className='profile-manage-spots-link'><Link to='/spots/current'>Manage Spots</Link></li>
                <li>
                    <button className='profile-logout-button' onClick={logout}>Log Out</button>
                </li>
            </ul>
        </>
    );
}

export default ProfileButton;
