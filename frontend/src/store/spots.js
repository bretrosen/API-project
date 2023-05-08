import { csrfFetch } from "./csrf";

// action type constants

const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_SINGLE_SPOT = 'spots/getSingleSpot';

// action creators

const getAllSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    spots
});

const getSingleSpot = (spot) => ({
    type: GET_SINGLE_SPOT,
    spot
});

// thunk action creators

export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();
        dispatch(getAllSpots(spots));
        return spots;
    }
};

export const getSingleSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    console.log('sending single spot thunk');

    if (response.ok) {
        const spot = await response.json();
        dispatch(getSingleSpot(spot));
        console.log('returning single spot thunk');
        return spot;
    }
}

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
        case GET_SINGLE_SPOT: {
            return {...state, allSpots: {}, singleSpot: {...action.spot}}
        }
        default:
            return state;
    }
}

export default spotsReducer;
