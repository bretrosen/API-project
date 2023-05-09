import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpotThunk, createSpotImagesThunk } from '../../store/spots';

export const SpotForm = ({ spot }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [url2, setUrl2] = useState('');
    const [url3, setUrl3] = useState('');
    const [url4, setUrl4] = useState('');
    const [url5, setUrl5] = useState('');
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // error handling
    useEffect(() => {
        const newErrors = {};
        const imageErrorMessage = 'Image URL must end in .png, .jpg, or .jpeg';

        if (!address.length || typeof address !== "string") newErrors['address'] = 'Address is required';
        if (!city.length || typeof city !== "string") newErrors['city'] = 'City is required';
        if (!state.length || typeof state !== "string") newErrors['state'] = 'State is required';
        if (!country.length || typeof country !== "string") newErrors['country'] = 'Country is required';
        // if (typeof lat !== "number") newErrors['lat'] = 'Please enter a valid latitude';
        // if (typeof lng !== "number") newErrors['lng'] = 'Please enter a valid longitude';
        if (!name.length || typeof name !== "string") newErrors['name'] = 'Name is required';
        if (description.length < 30 || typeof description !== "string") newErrors['description'] = 'Description needs a minimum of 30 characters';
        // if (!price || typeof price !== "number") newErrors['price'] = 'Price is required';
        if (!previewImage.length) newErrors['previewImage'] = 'Preview image is required';
        if (!(previewImage.endsWith('.jpg') || previewImage.endsWith('.png') || previewImage.endsWith('.jpeg'))) newErrors['previewIimage'] = imageErrorMessage;
        if (url2.length > 0 && !(url2.endsWith('.jpg') || url2.endsWith('.png') || url2.endsWith('.jpeg'))) newErrors['url2'] = imageErrorMessage;
        if (url3.length > 0 && !(url3.endsWith('.jpg') || url3.endsWith('.png') || url3.endsWith('.jpeg'))) newErrors['url3'] = imageErrorMessage;
        if (url4.length > 0 && !(url4.endsWith('.jpg') || url4.endsWith('.png') || url4.endsWith('.jpeg'))) newErrors['url4'] = imageErrorMessage;
        if (url5.length > 0 && !(url5.endsWith('.jpg') || url5.endsWith('.png') || url5.endsWith('.jpeg'))) newErrors['url5'] = imageErrorMessage;

        setErrors(newErrors);
    }, [address, city, state, country, lat, lng, name, description, price, previewImage, url2, url3, url4, url5]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        setHasSubmitted(true);

        // object to match request to backend create spot route
        const formInfo = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }

        // objects to match request to backend to add image to spot
        const preview = {url: previewImage, preview: true};
        const image2 = {url: url2, preview: false};
        const image3 = {url: url3, preview: false};
        const image4 = {url: url4, preview: false};
        const image5 = {url: url5, preview: false};

        // spot data and preview image are required
        // create other images if they were added

        if (!Object.values(errors).length) {
        const newSpot = await dispatch(createSpotThunk(formInfo));
        await dispatch(createSpotImagesThunk(newSpot.id, preview));
        url2.length && await dispatch(createSpotImagesThunk(newSpot.id, image2));
        url3.length && await dispatch(createSpotImagesThunk(newSpot.id, image3));
        url4.length && await dispatch(createSpotImagesThunk(newSpot.id, image4));
        url5.length && await dispatch(createSpotImagesThunk(newSpot.id, image5));

        // redirect to newly created spot
        history.push(`/spots/${newSpot.id}`);
        }
    };

    return (
        <div className='create-spot-form-wrapper'>
            <h1>Create a new Spot</h1>
            <h2>Where's your place located?</h2>
            <h3>Guests will only get your exact address once they book a reservation.</h3>
            <form className='create-spot-form' onSubmit={handleSubmit}>
                <div>
                    {hasSubmitted && errors.country && (
                        <p>{errors.country}</p>
                    )}
                </div>
                <div>
                    <label>
                        Country
                        <input
                            type='text'
                            placeholder='Country'
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    {hasSubmitted && errors.address && (
                        <p>{errors.address}</p>
                    )}
                </div>
                <div>
                    <label>
                        Street Address
                        <input
                            type='text'
                            placeholder='Address'
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    {hasSubmitted && errors.city && (
                        <p>{errors.city}</p>
                    )}
                </div>
                <div>
                    <label>
                        City
                        <input
                            type='text'
                            placeholder='City'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    {hasSubmitted && errors.state && (
                        <p>{errors.state}</p>
                    )}
                </div>
                <div>
                    <label>
                        State
                        <input
                            type='text'
                            placeholder='STATE'
                            value={state}
                            onChange={e => setState(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    {hasSubmitted && errors.lat && (
                        <p>{errors.lat}</p>
                    )}
                </div>
                <div>
                    <label>
                        Latitude
                        <input
                            type='number'
                            placeholder='Latitude'
                            value={lat}
                            onChange={e => setLat(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    {hasSubmitted && errors.lng && (
                        <p>{errors.lng}</p>
                    )}
                </div>
                <div>
                    <label>
                        Longitude
                        <input
                            type='number'
                            placeholder='Longitude'
                            value={lng}
                            onChange={e => setLng(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        <h2>Describe your place to guests</h2>
                        <p>Mention the best features of your space, any special amentities like
                            fast wif or parking, and what you love about the neighborhood.</p>
                        <textarea
                            placeholder='Description'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    {hasSubmitted && errors.description && (
                        <p>{errors.description}</p>
                    )}
                </div>

                <div>
                    <label>
                        <h2>Create a title for your spot</h2>
                        <p>Catch guests' attention with a spot title that highlights what makes
                            your place special.</p>
                        <input
                            type='text'
                            placeholder='Name of your spot'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    {hasSubmitted && errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>


                <div>
                    <label>
                        <h2>Set a base price for your spot</h2>
                        <p>Competitive pricing can help your listing stand out and rank higher
                            in search results</p>
                        <input
                            type='number'
                            placeholder='Price per night (USD)'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    {hasSubmitted && errors.price && (
                        <p>{errors.price}</p>
                    )}
                </div>

                <div>
                    <label>
                        <h2>Liven up your spot with photos</h2>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        <input
                            type='text'
                            placeholder='Preview Image URL'
                            value={previewImage}
                            onChange={e => setPreviewImage(e.target.value)}
                        />
                    </label>
                    <div>
                        {hasSubmitted && errors.previewImage && (
                            <p>{errors.previewImage}</p>
                        )}
                    </div>
                    <input
                            type='text'
                            placeholder='Image URL'
                            value={url2}
                            onChange={e => setUrl2(e.target.value)}
                        />
                    <div>
                        {hasSubmitted && errors.url2 && (
                            <p>{errors.url2}</p>
                        )}
                    </div>
                    <input
                            type='text'
                            placeholder='Image URL'
                            value={url3}
                            onChange={e => setUrl3(e.target.value)}
                        />
                    <div>
                        {hasSubmitted && errors.url3 && (
                            <p>{errors.url3}</p>
                        )}
                    </div>
                    <input
                            type='text'
                            placeholder='Image URL'
                            value={url4}
                            onChange={e => setUrl4(e.target.value)}
                        />
                    <div>
                        {hasSubmitted && errors.url4 && (
                            <p>{errors.url4}</p>
                        )}
                    </div>
                    <input
                            type='text'
                            placeholder='Image URL'
                            value={url5}
                            onChange={e => setUrl5(e.target.value)}
                        />
                    <div>
                        {hasSubmitted && errors.url5 && (
                            <p>{errors.url5}</p>
                        )}
                    </div>
                </div>

                <div>
                    <button type='submit'>Create Spot</button>
                </div>

            </form>
        </div>
    )
}
