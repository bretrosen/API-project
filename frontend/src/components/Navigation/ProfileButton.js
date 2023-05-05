import React from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();

    const logout = (event) => {
        event.preventDefault();
        dispatch(sessionActions.logoutThunk());
    };

    return (
        <>
            <button>
                <i className="fa-solid fa-book-atlas" />
            </button>
            <ul className="profile-dropdown">
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                <li>
                    <button onClick={logout}>Log Out</button>
                </li>
            </ul>
        </>
    );
}

export default ProfileButton;
