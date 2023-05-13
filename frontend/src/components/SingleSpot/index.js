import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleSpotThunk } from '../../store/spots';
import { getSpotReviewsThunk } from '../../store/reviews';
import OpenModalButton from "../OpenModalButton";
import CreateReviewFormModal from '../CreateReviewFormModal';
import DeleteReviewModal from '../DeleteReviewModal';
import './SingleSpot.css';

export const SingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    // get single spot, owner of the spot, and the spot's images from the store
    const spot = useSelector(state => state.spots.singleSpot);
    const owner = useSelector(state => state.spots.singleSpot.Owner);
    const spotImages = useSelector(state => state.spots.singleSpot.SpotImages);
    // get reviews from the store
    const reviewsObj = useSelector(state => state.reviews.spot);
    // const reviews = Object.values(reviewsObj);

    // reverse reviews array to put new reviews at top
    const normalReviews = Object.values(reviewsObj);
    const reviews = normalReviews.reverse();

    // get user id to check if they're allowed to review the spot
    const userId = useSelector(state => state.session.user?.id);

    // get user first name from session
    // shouldn't need to do this...?
    // but this gets the first name for a newly created review
    const userFirstName = useSelector(state => state.session.user?.firstName);

    // user can create a review if they aren't the spot owner and they don't have a review for the spot
    let userCanReview = false;
    const foundReview = reviews.find(review => review.userId === userId);
    if (userId !== spot.ownerId && !foundReview) {
        userCanReview = true;
    }

    // useEffect to trigger dispatch of thunk for getting spot
    // added reviews dependency to update review aggregate data
    useEffect(() => {
        console.log("useEffect for single spot thunk ran")
        dispatch(getSingleSpotThunk(spotId));
    }, [dispatch, spotId, reviewsObj]);

    // useEffect to trigger dispatch of thunk for getting spot reviews
    useEffect(() => {
        console.log("useEffect for spot reviews thunk ran")
        dispatch(getSpotReviewsThunk(spotId))
    }, [dispatch, spotId])

    // don't try to render before useEffect registers the spotId
    if (!Object.values(spot).length) return null;

    // variable to increment for each image to place in grid display
    let count = 1;

    //button alert for non-existent bookings
    const handleClick = () => {
        return alert('Feature Coming Soon...')
    };

    //helper function to format date
    const formatDate = (date) => {
        const months = ['January', 'Februrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthNum = new Date(date).getMonth();
        const monthString = months[monthNum];
        const year = 1900 + new Date(date).getYear();
        return (monthString + " " + year.toString());
    }

    return (

        <div className='spot-wrapper'>
            {/* spot heading */}
            <div className='spot-name'>{spot.name}</div>
            <h2>{spot.city}, {spot.state}, {spot.country}</h2>
            {/* spot images */}
            <div className='spot-images'>
                {spotImages.map((image) => (
                    <div className={` image${count}`} key={image.id}>
                        <img className={(image.preview ? "preview-image" : "single-spot-image")} src={image.url} alt={spot.name}></img>
                        <div className='hide-this-janky-variable'>{count++}</div>
                    </div>

                ))}
            </div>

            <div className='spot-info'>
                <div className='spot-text'>
                    <div className='spot-host'>Hosted by {owner.firstName} {owner.lastName}</div>
                    <p>{spot.description}</p>
                </div>

                <div className='reserve-box'>
                    <div className='reserve-top'>
                        <div className='reserve-top-left'>
                            <b>${spot.price}</b> &nbsp;night
                        </div>
                        <div className='reserve-box-rating'>
                            <i className="fa-solid fa-star" />
                            {spot.avgStarRating?.toFixed(1)}
                            {!spot.avgStarRating && `New`}
                        </div>
                        {spot.numReviews >=1 && `·`}
                        <div className='reserve-box-reviews'>
                            {spot.numReviews === 1 && `1 review`}
                            {spot.numReviews > 1 && `${spot.numReviews} reviews`}
                        </div>
                    </div>
                    <button className='reserve-button' onClick={handleClick}>Reserve</button>
                </div>
            </div>

            <div className='review-info'>
                {spot.numReviews >= 1 &&
                    <div className='reviews-heading'>
                        <i className="fa-solid fa-star" />
                        {spot.avgStarRating?.toFixed(1)}
                        {!spot.avgStarRating && `New`}
                        &nbsp;·&nbsp;
                        {spot.numReviews === 1 && `1 review`}
                        {spot.numReviews > 1 && `${spot.numReviews} reviews`}
                        <div className='post-review-top'>
                            {userCanReview && userId &&
                                <OpenModalButton
                                    buttonText='Post Your Review'
                                    modalComponent={<CreateReviewFormModal spotId={spot.id} />}
                                />
                            }
                        </div>
                    </div>
                }

                {spot.numReviews >= 1 && reviews.map((review) => (
                    <div className='single-review' key={review.id}>
                        <h2>{review.User?.firstName || userFirstName}</h2>
                        <p className="review-date">{formatDate(review.createdAt)}</p>
                        <p>{review.review}</p>
                        {review.userId === userId &&
                            <OpenModalButton
                                buttonText='Delete'
                                modalComponent={<DeleteReviewModal reviewId={review.id} />}
                            />}
                    </div>
                ))}

                {!reviews.length &&
                    <div>
                        <div>
                            <i className="fa-solid fa-star" /> New
                        </div>
                        {userCanReview && userId &&
                            <>
                                <OpenModalButton
                                    buttonText='Post Your Review'
                                    className='post-review'
                                    modalComponent={<CreateReviewFormModal spotId={spot.id} />}
                                />
                                <p>Be the first to post a review!</p>
                            </>
                        }

                    </div>
                }


            </div>

        </div>

    );
}
