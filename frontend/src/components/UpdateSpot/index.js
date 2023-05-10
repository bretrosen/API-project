import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SpotForm } from '../CreateSpot';

export const UpdateSpotForm = () => {
    const { spotId } = useParams();
    const spots = Object.values(useSelector(state => state.spots.allSpots));
    const spot = spots.find(s => s.id === parseInt(spotId));

    if (!spot) return(<></>);

    // pass spot data to form to populate fields for update
    // pass form type to allow form to dispatch a different thunk for updating
    return (
        Object.keys(spot).length > 1 && (
            <>
            <SpotForm spot={spot} formType='Update'/>
            </>
        )
    )
};
