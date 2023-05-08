// get all spots index component

// backend route to get all spots ('/api/spots')
// backend responds with
// {
//     'Spots': spotData,
//     "page": page,
//     "size": size
// }

// redux
// type string
// action creator
// thunk action creator
// reducer: case in the reducer for getting all spots
// normalize spot data

// component
// dispatch to fetch data and add to store
// useSelector gets data from store and gives component access to data
// useEffect triggers dispatch of thunk
// convert spotData obj to list
// show data on page through return jsx, map through list of spots

// render component in app.js, import into app.js
// route, path

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
                        <img src={spot.previewImage} alt={spot.name}></img>
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
