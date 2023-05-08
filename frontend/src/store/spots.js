import { csrfFetch } from "./csrf";

// action type constants

const GET_ALL_SPOTS = 'spots/getAllSpots';

// action creators

const getAllSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    spots
});

// thunk action creators

export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();
        dispatch(getAllSpots(spots));
        console.log("response is ok")
        return spots;
    }
};

const initialState = {allSpots: {}, singleSpot: {}};

// reducer
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const newState = {...state};
            action.spots.Spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot;
            });
            return newState;
        };
        default:
            return state;
    }
}

export default spotsReducer;
