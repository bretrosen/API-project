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
    const reviews = useSelector(state => Object.values(state.reviews.spot));
    console.log("reviews in single spot", reviews);

    // const month = new Date(reviews[0]?.createdAt).getMonth();
    // // const date2 = new Date(date);
    // // const month = date2?.getMonth();
    // console.log('month', month);
    // const year = new Date(reviews[0]?.createdAt).getYear();
    // console.log('year', year);

    // get user id to check if they're allowed to review the spot
    const userId = useSelector(state => state.session.user?.id);
    // get user first name for newly created reviews
    const userFirstName = useSelector(state => state.session.user?.firstName)

    // user can create a review if they aren't the spot owner and they don't have a review for the spot
    let userCanReview = false;
    const foundReview = reviews.find(review => review.userId === userId);
    if (userId !== spot.ownerId && !foundReview) {
        userCanReview = true;
    }

    // useEffect to trigger dispatch of thunks for the selected spotId
    useEffect(() => {
        dispatch(getSingleSpotThunk(spotId));
        dispatch(getSpotReviewsThunk(spotId));
    }, [dispatch, spotId]);

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

    const dateReturn = formatDate(reviews[0]?.createdAt);
    console.log("returned date", dateReturn);

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
                            {spot.avgStarRating}
                            {!spot.avgStarRating && `New`}
                        </div>
                        ·
                        <div className='reserve-box-reviews'>
                            {spot.numReviews} reviews
                        </div>
                    </div>
                    <button className='reserve-button' onClick={handleClick}>Reserve</button>
                </div>
            </div>

            <div className='review-info'>
                {reviews.length &&
                    <div className='reviews-heading'>
                        <i className="fa-solid fa-star" />
                        {spot.avgStarRating}
                        {!spot.avgStarRating && `New`}
                        &nbsp;·&nbsp;
                        {spot.numReviews} reviews
                        {userCanReview &&
                            <OpenModalButton
                                buttonText='Post Your Review'
                                modalComponent={<CreateReviewFormModal spotId={spot.id} />}
                            />
                        }
                    </div>
                }

                {reviews.length && reviews.map((review) => (
                    <div className='single-review' key={review.id}>
                        {/* userFirstName variable is for newly created reviews */}
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
                            Stars: New
                        </div>
                        {userCanReview &&
                            <OpenModalButton
                                buttonText='Post Your Review'
                                modalComponent={<CreateReviewFormModal spotId={spot.id} />}
                            />}
                        <p>Be the first to post a review!</p>
                    </div>
                }


            </div>

        </div>

    );
}
