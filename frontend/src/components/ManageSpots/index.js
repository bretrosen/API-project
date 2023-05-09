import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCurrentUserSpotsThunk } from '../../store/spots';
import './ManageSpots.css';

export const CurrentUserSpotList = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // this is kinda janky, there should be a clean way to do it with useEffect
    // where it registers the current user and rerenders
    // but it works on refresh so for now...
    const allSpots = useSelector(state => (Object.values(state.spots.allSpots)));
    const currentUserId = useSelector(state => state.session.user?.id)
    const spots = [];
    allSpots.forEach(spot => {
        if (spot.ownerId === currentUserId) {
            spots.push(spot);
        }
    })

    // useEffect to trigger dispatch of thunk
    useEffect(() => {
        dispatch(getCurrentUserSpotsThunk());
    }, [dispatch]);

    return (
        <>
            <h1>Manage Your Spots</h1>
            <button onClick={() => history.push('/spots/new')}>Create a New Spot</button>
            <ul>
                {spots.map((spot) => (
                    <div key={spot.id}>
                        <a href={`/spots/${spot.id}`}>
                            <img src={spot.previewImage} alt={spot.name}></img>
                        </a>
                        <p>
                            {spot.city}, {spot.state}
                        </p>
                        <p>
                            ${spot.price} night
                        </p>
                        <button onClick={() => history.push('/spots/new')}>Update</button>
                        <button onClick={() => history.push('spots/new')}>Delete</button>
                    </div>
                ))}
            </ul>
        </>
    );
};
