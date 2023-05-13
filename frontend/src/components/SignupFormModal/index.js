import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    let canSubmit = false;
    if (email.length && username.length > 3 && firstName.length && lastName.length && password.length > 5 && confirmPassword.length) canSubmit = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        // validate password and confirm password match before submission
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(
                sessionActions.signupThunk({
                    email,
                    username,
                    firstName,
                    lastName,
                    password
                })
            )
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    console.log("errors", data.errors);
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field",
            email: "The provided email is invalid"
        });
    };

    return (
        <div className='signup-form-wrapper'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className='signup-form'>
                {errors.firstName && <p className='signup-errors'>{errors.firstName}</p>}
                {errors.lastName && <p className='signup-errors'>{errors.lastName}</p>}
                {errors.email && <p className='signup-errors'>{errors.email}</p>}
                {errors.username && <p className='signup-errors'>{errors.username}</p>}
                {errors.password && <p className='signup-errors'>{errors.password}</p>}
                {errors.confirmPassword && <p className='signup-errors'>{errors.confirmPassword}</p>}

                    <label>
                        <input
                            className='signup-form-input'
                            type="text"
                            placeholder='First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </label>


                    <label>
                        <input
                            className='signup-form-input'
                            type="text"
                            placeholder='Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </label>


                    <label>
                        <input
                            className='signup-form-input'
                            type="text"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        <input
                            className='signup-form-input'
                            type="text"
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>


                    <label>
                        <input
                            className='signup-form-input'
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>


                    <label>
                        <input
                            className='signup-form-input'
                            type="password"
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>


                    <button
                        className={canSubmit ? 'submit-signup-button' : 'submit-signup-button-disabled'}
                        type="submit"
                        disabled={!canSubmit}
                    >Sign Up
                    </button>
                </div>
            </form>

        </div>
    );
}

export default SignupFormModal;
