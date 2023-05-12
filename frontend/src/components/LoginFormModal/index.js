import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});
        return dispatch(sessionActions.loginThunk({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };

    return (
        <div className='wrapper'>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className='login-form'>
                    <label  >
                        <input
                            className='login-form-input'
                            type='text'
                            placeholder='Username or Email'
                            value={credential}
                            onChange={e => setCredential(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <input
                            className='login-form-input'
                            type='password'
                            value={password}
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    {errors.credential && <p>{errors.credential}</p>}
                    <button className='modal-button' type='submit'>Log In</button>
                </div>
            </form>

        </div>
    );
}

export default LoginFormModal;
