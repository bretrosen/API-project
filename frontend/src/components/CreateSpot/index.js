import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpotThunk } from '../../store/spots';

export const SpotForm = ({spot}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [country, setCountry] = useState(spot?.country);
    const [lat, setLat] = useState(spot?.lat);
    const [lng, setLng] = useState(spot?.lng);
    const [name, setName] = useState(spot?.name);
    const [description, setDescription] = useState(spot?.description);
    const [price, setPrice] = useState(spot?.price);
    const [previewImage, setPreviewImage] = useState(spot?.previewImage);
    const [url2, setUrl2] = useState(spot?.url2);
    const [url3, setUrl3] = useState(spot?.url3);
    const [url4, setUrl4] = useState(spot?.url4);
    const [url5, setUrl5] = useState(spot?.url5);
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // error handling
    useEffect(() => {
        const newErrors = {};
        if (!address.length || typeof address !== "string") newErrors['address'] = 'Address is required';
        if (!city.length || typeof city !== "string") newErrors['city'] = 'City is required';
        if (!country.length || typeof country !== "string") newErrors['country'] = 'Country is required';
        if (typeof lat !== "number") newErrors['lat'] = 'Please enter a valid latitude';
        if (typeof lng !== "number") newErrors['lng'] = 'Please enter a valid longitude';
        if (!name.length || typeof name !== "string") newErrors['name'] = 'Name is required';
        if (description.length < 30 || typeof description !=="string") newErrors['description'] = 'Description needs a minimum of 30 characters';
        if (!price || typeof price !== "number") newErrors['price'] = 'Price is required';
        if (!previewImage.length) newErrors['previewImage'] = 'Preview image is required';
        setErrors(newErrors);
    }, [address, city, country, lat, lng, name, description, price, previewImage]);


    const handleSubmit = (event) => {
        event.preventDefault();
        setHasSubmitted(true);

        const formInfo = {
            address,
            city,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage,
            url2,
            url3,
            url4,
            url5
        };

        const newSpot = dispatch(createSpotThunk(formInfo));

        if (newSpot) {
            history.push(`/spots/${newSpot.id}`);
        } else {
            history.push('/');
        }
    };

    return (
        <form className='create-spot-form' onSubmit={handleSubmit}>
            <h1>Create a new Spot</h1>
            <h2>Where's your place located?</h2>
            <h3>Guests will only get your exact address once they book a reservation.</h3>
        </form>
    )
}
