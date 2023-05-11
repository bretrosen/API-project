import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpotsThunk } from '../../store/spots';
import './SpotList.css';

export const SpotList = () => {
    const dispatch = useDispatch();
    // get spots from store
    const spots = useSelector(state => (Object.values(state.spots.allSpots)));

    // useEffect to trigger dispatch of thunk
    useEffect(() => {
        dispatch(getAllSpotsThunk());
    }, [dispatch]);

    return (
        <div className='spots-list-wrapper'>
            {spots.map((spot) => (
                <div className='spots-list-item' key={spot.id}>
                    <a href={`/spots/${spot.id}`}>
                        <img src={spot.previewImage} alt={spot.name}></img>
                    </a>
                    <p>
                        {spot.city}, {spot.state}, {spot.avgRating}
                    </p>
                    <p>
                        ${spot.price} night
                    </p>
                </div>
            ))}
        </div>
    );
};
