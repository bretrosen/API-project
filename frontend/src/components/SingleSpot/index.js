import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleSpotThunk } from '../../store/spots';
import './SingleSpot.css';

export const SingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    // get single spot, owner of the spot, and the spot's images from the store
    const spot = useSelector(state => state.spots.singleSpot);
    const owner = useSelector(state => state.spots.singleSpot.Owner);
    const spotImages = useSelector(state => state.spots.singleSpot.SpotImages);

    // useEffect to trigger dispatch of thunk for the selected spotId
    useEffect(() => {
        dispatch(getSingleSpotThunk(spotId))
    }, [dispatch, spotId]);

    // don't try to render before useEffect registers the spotId
    if (!Object.values(spot).length) return null;

    return (
        <div className='spot-wrapper'>
            <h1>{spot.name}</h1>
            <h2>{spot.city}, {spot.state}, {spot.country}</h2>
            <div className='spot-images'>
                {spotImages.map((image) => (
                    <div className='single-spot-image' key={image.id}>
                        <img src={image.url} alt={spot.name}></img>
                    </div>
                ))}
            </div>
            <div className='spot-text'>
                <p>Hosted by {owner.firstName} {owner.lastName}</p>
                <p>{spot.description}</p>
            </div>
            <div className='reserve-box'>
                <div className='reserve-box-price'>
                    ${spot.price} night
                </div>
                <div className='reserve-box-rating'>
                    Stars: {spot.avgStarRating}
                </div>
                <div className='reserve-box-reviews'>
                    {spot.numReviews} reviews
                </div>

            </div>
        </div>
    );
}