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
        <>
            <ul>
                {spots.map((spot) => (
                    <>
                    <div key={spot.id}>
                        <a href={`/spots/${spot.id}`}>
                        <img src={spot.previewImage} alt={spot.name}></img>
                        </a>
                    </div>
                    <p>
                        {spot.city}, {spot.state}
                    </p>
                    <p>
                        ${spot.price} night
                        </p>
                    </>
    ))}
            </ul>
        </>
    );
};
