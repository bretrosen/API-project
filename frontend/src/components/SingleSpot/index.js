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
    // console.log("reviews in single spot", reviews);

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

            <div className='spot-text'>
                <h2>Hosted by {owner.firstName} {owner.lastName}</h2>
                <p>{spot.description}</p>
            </div>

            <div className='reserve-box'>
                <div className='reserve-box-price'>
                    ${spot.price} night
                </div>
                <div className='reserve-box-rating'>
                    <i className="fa-solid fa-star" />
                    {spot.avgStarRating}
                    {!spot.avgStarRating && `New`}
                </div>
                <div className='reserve-box-reviews'>
                    {spot.numReviews} reviews
                </div>
            </div>
            <br></br>
            <br></br>

            {reviews.length &&
                <div>
                    <div>
                        Stars: {spot.avgStarRating}
                    </div>
                    <div>
                        {spot.numReviews} reviews
                    </div>
                    {userCanReview &&
                        <OpenModalButton
                            buttonText='Post Your Review'
                            modalComponent={<CreateReviewFormModal spotId={spot.id} />}
                        />
                    }
                </div>
            }

            {reviews.length && reviews.map((review) => (
                <div key={review.id}>
                    {/* userFirstName variable is for newly created reviews */}
                    <p>{review.User?.firstName || userFirstName}</p>
                    <p>{review.createdAt}</p>
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

    );
}
