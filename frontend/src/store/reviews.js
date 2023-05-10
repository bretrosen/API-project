import { csrfFetch } from "./csrf";

// action type constants

const GET_SPOT_REVIEWS = 'reviews/getSpotReviews';


// action creators

const getSpotReviews = (reviews) => ({
    type: GET_SPOT_REVIEWS,
    reviews
});


// thunk action creators

export const getSpotReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    console.log("sending get reviews by spot thunk", response);

    if (response.ok) {
        const reviews = await response.json();
        console.log("returning reviews by spot thunk", reviews);
        dispatch(getSpotReviews(reviews));
        return reviews;
    }
};

const initialState = {spot: {}, user: {}};


// reducer
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOT_REVIEWS: {
            const newState = {...state};
            action.reviews.Reviews.forEach((review) => {
                newState.spot[review.id] = review;
            });
            return newState;
        }
        default:
            return state;
    }
};

export default reviewsReducer;
