import { csrfFetch } from "./csrf";

// action type constants

const GET_SPOT_REVIEWS = 'reviews/getSpotReviews';
const CREATE_REVIEW = 'reviews/createReview';


// action creators

const getSpotReviews = (reviews) => ({
    type: GET_SPOT_REVIEWS,
    reviews
});

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})


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

export const createReviewThunk = (spotId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });
    console.log('sending create spot thunk to backend');

    if (response.ok) {
        const reviewData = await response.json();
        console.log('returning created review to frontend', reviewData);
        dispatch(createReview(reviewData));
        return reviewData;
    }

}

const initialState = {spot: {}};


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
        case CREATE_REVIEW: {
            // const newState = {...state, spot: {...action.review}};
            // return newState;
            const id = action.review.id;
            const newState = {...state.spot}
            newState[id] = {...action.review};
            return {...state, spot: newState}
        }
        default:
            return state;
    }
};

export default reviewsReducer;
