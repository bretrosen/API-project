import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SpotForm } from '../CreateSpot';

export const UpdateSpotForm = () => {
    const { spotId } = useParams();
    const spots = Object.values(useSelector(state => state.spots.allSpots));
    const spot = spots.find(s => s.id == spotId);

    if (!spot) return(<></>);

    return (
        Object.keys(spot).length > 1 && (
            <>
            <SpotForm spot={spot} />
            </>
        )
    )
};
