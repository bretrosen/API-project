import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCurrentUserSpotsThunk } from '../../store/spots';
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from '../DeleteSpotModal';
import './ManageSpots.css';

export const CurrentUserSpotList = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // this is kinda janky, it should work like getting all spots
    // but it works so for now...
    const allSpots = useSelector(state => (Object.values(state.spots.allSpots)));
    const currentUserId = useSelector(state => state.session.user?.id)
    const spots = [];
    allSpots.forEach(spot => {
        if (spot.ownerId === currentUserId) {
            spots.push(spot);
        }
    })

    // same logic as getting all spots from store
    // just getting different list of spots from backend
    // this should work but only does on refresh
    // const spots = useSelector(state => (Object.values(state.spots.allSpots)));

    // useEffect to trigger dispatch of thunk
    useEffect(() => {
        console.log("use effect in manage spots ran");
        dispatch(getCurrentUserSpotsThunk());
    }, [dispatch, spots]);



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
                        <button onClick={() => history.push(`/spots/${spot.id}/edit`)}>Update</button>
                        <OpenModalButton
                            buttonText='Delete'
                            modalComponent={<DeleteSpotModal spotId={spot.id} />}
                        />
                    </div>
                ))}
            </ul>
        </>
    );
};
