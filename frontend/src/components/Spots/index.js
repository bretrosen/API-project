import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpotsThunk } from '../../store/spots';
import './SpotList.css';

export const SpotList = () => {
    const dispatch = useDispatch();
    // get spots from store
    // don't call Object.values inside useSelector, creates new refs/weird behavior
    // const spots = useSelector(state => (Object.values(state.spots.allSpots)));
    const spotsObj = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsObj);

    // useEffect to trigger dispatch of thunk
    useEffect(() => {
        dispatch(getAllSpotsThunk());
    }, [dispatch]);

    return (
        <div className='spots-list-wrapper'>
            {spots.map((spot) => (

                <div className='spots-list-item' key={spot.id}>
                    <span data-text={spot.name} className='spots-list-tooltip'>
                        <a href={`/spots/${spot.id}`}>
                            <img className='spots-list-image' src={spot.previewImage} alt={spot.name}></img>
                            <div className='spots-list-item-text-1'>
                                <div className='spots-list-item-location'>
                                    {spot.city}, {spot.state}
                                </div>
                                <div className='spots-list-item-star-rating'>
                                    <i className="fa-solid fa-star" />
                                    {spot.avgRating?.toFixed(1)}
                                    {!spot.avgRating && `New`}
                                </div>
                            </div>
                            <div className='spots-list-item-text-2'>
                                <div className='spots-list-item-price'>
                                    ${spot.price}
                                </div>
                                <div className='spots-list-item-night'>
                                    night
                                </div>
                            </div>
                        </a>
                    </span>
                </div>
            ))}
        </div>
    );
};
