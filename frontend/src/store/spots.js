import { csrfFetch } from "./csrf";

// action type constants

const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_SINGLE_SPOT = 'spots/getSingleSpot';
const CREATE_SPOT = 'spots/createSpot';
const DELETE_SPOT = '/spots/deleteSpot';

// action creators

const getAllSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    spots
});

const getSingleSpot = (spot) => ({
    type: GET_SINGLE_SPOT,
    spot
});

const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
})

const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

// thunk action creators

export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    console.log("all spots response", response);

    if (response.ok) {
        const spots = await response.json();
        dispatch(getAllSpots(spots));
        return spots;
    }
};

export const getCurrentUserSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current');
    console.log("sending current user spots thunk", response);

    if (response.ok) {
        const spots = await response.json();
        console.log("returning current user spots thunk", spots)
        dispatch(getAllSpots(spots));
        return spots;
    }
}

export const getSingleSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    console.log('sending single spot thunk',);

    if (response.ok) {
        const spot = await response.json();
        dispatch(getSingleSpot(spot));
        console.log('returning single spot thunk');
        return spot;
    }
}

export const createSpotThunk = (spot) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });
    console.log("sending create spot thunk to backend", response);

    if (response.ok) {
        const spotData = await response.json();
        dispatch(createSpot(spotData));
        console.log("returning created spot to frontend", spotData);
        return spotData;
    }
}

export const createSpotImagesThunk = (spotId, imgObj) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imgObj)
    });
    console.log("sending create spot image thunk to backend", response);

    if (response.ok) {
        const spotImage = await response.json();
        dispatch(createSpot(spotImage));
        console.log("returning created spot image thunk to frontend", spotImage);
        return spotImage;
    }
}

export const updateSpotThunk = (spotId, spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });
    console.log("sending update spot thunk to backend");

    if (response.ok) {
        const updatedSpot = await response.json();
        dispatch(createSpot(updatedSpot));
        console.log("returning updated spot thunk to frontend", updatedSpot);
        return updatedSpot;
    }
}

export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: { "message": "Successfully deleted"}
    });

    if (response.ok) {
        await response.json();
        dispatch(deleteSpot(spotId));
        return;
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
            return {...state, allSpots: {}, singleSpot: {...action.spot}};
        }
        case CREATE_SPOT: {
            const newState = {...state, allSpots: {...action.spot}, singleSpot: {}};
            return newState;
        }
        case DELETE_SPOT: {
            const newState = {...state};
            delete newState[action.spotId];
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;
