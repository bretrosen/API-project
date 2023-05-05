import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

// signup
export const signupThunk = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
}

// login
export const loginThunk = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

// restore user session
export const restoreUserThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER: {
            const newState = {...state};
            newState.user = action.payload;
            return newState;
        }
        case REMOVE_USER:{
            const newState = {...state};
            newState.user = null;
            return newState;
        }
        default:
            return state;
    }
};

export default sessionReducer;
