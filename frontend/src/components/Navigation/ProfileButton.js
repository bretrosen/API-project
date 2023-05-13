import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';


const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const closeMenu = () => setShowMenu(false);

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
        history.push('/');
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <div className='nav-right-menu'>
                <button className='profile-menu' onClick={openMenu}>
                    <i className='fa-solid fa-bars' />
                    <i className="fa-regular fa-compass" />
                    {/* <i className="fa-solid fa-book-atlas" /> */}
                </button>
            </div>
            <ul className={ulClassName} ref={ulRef}>

                {user ? (
                    <>
                        <li>Hello, {user.firstName}</li>
                        <li>{user.email}</li>
                        <li className='profile-manage-spots-link'><Link className='profile-manage-spots-link-a' to='/spots/current'>Manage Spots</Link></li>
                        <li>
                            <button className='profile-logout-button' onClick={logout}>Log Out</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className='profile-button-link'>
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </li>
                        <li li className='profile-button-link'>
                            <OpenModalMenuItem
                                itemText='Log In'
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </li>

                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
