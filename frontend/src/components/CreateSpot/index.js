import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpotThunk, createSpotImagesThunk, updateSpotThunk } from '../../store/spots';
import './CreateSpot.css';

export const SpotForm = ({ spot, formType }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [address, setAddress] = useState(spot?.address || '');
    const [city, setCity] = useState(spot?.city || '');
    const [state, setState] = useState(spot?.state || '');
    const [country, setCountry] = useState(spot?.country || '');
    // const [lat, setLat] = useState(spot?.lat || '');
    // const [lng, setLng] = useState(spot?.lng || '');
    const [name, setName] = useState(spot?.name || '');
    const [description, setDescription] = useState(spot?.description || '');
    const [price, setPrice] = useState(spot?.price || '');
    const [previewImage, setPreviewImage] = useState(spot?.previewImage || '');
    const [url2, setUrl2] = useState('');
    const [url3, setUrl3] = useState('');
    const [url4, setUrl4] = useState('');
    const [url5, setUrl5] = useState('');
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // console.log("form type in create/update form", formType);

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
        if (!price) newErrors['price'] = 'Price is required';
        if (!previewImage.length) newErrors['previewImage'] = 'Preview image is required';
        if (previewImage.length > 0 && !(previewImage.endsWith('.jpg') || previewImage.endsWith('.png') || previewImage.endsWith('.jpeg'))) newErrors['previewImage'] = 'Preview image must end in .png, .jpg, or .jpeg';
        if (url2.length > 0 && !(url2.endsWith('.jpg') || url2.endsWith('.png') || url2.endsWith('.jpeg'))) newErrors['url2'] = imageErrorMessage;
        if (url3.length > 0 && !(url3.endsWith('.jpg') || url3.endsWith('.png') || url3.endsWith('.jpeg'))) newErrors['url3'] = imageErrorMessage;
        if (url4.length > 0 && !(url4.endsWith('.jpg') || url4.endsWith('.png') || url4.endsWith('.jpeg'))) newErrors['url4'] = imageErrorMessage;
        if (url5.length > 0 && !(url5.endsWith('.jpg') || url5.endsWith('.png') || url5.endsWith('.jpeg'))) newErrors['url5'] = imageErrorMessage;

        setErrors(newErrors);
    }, [address, city, state, country, name, description, price, previewImage, url2, url3, url4, url5]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        setHasSubmitted(true);

        // object to match request to backend create spot route
        const formInfo = {
            address,
            city,
            state,
            country,
            lat: 45.4545,
            lng: 65.6565,
            name,
            description,
            price
        }

        // objects to match request to backend to add image to spot
        const preview = { url: previewImage, preview: true };
        const image2 = { url: url2, preview: false };
        const image3 = { url: url3, preview: false };
        const image4 = { url: url4, preview: false };
        const image5 = { url: url5, preview: false };

        // spot data and preview image are required
        // create other images if they were added

        if (!Object.values(errors).length) {

            // conditional here to dispatch update thunk
            if (formType === 'Update') {
                const updatedSpot = await dispatch(updateSpotThunk(spot.id, formInfo));
                // redirect to updated spot
                history.push(`/spots/${updatedSpot.id}`);
            } else {
                const newSpot = await dispatch(createSpotThunk(formInfo));
                await dispatch(createSpotImagesThunk(newSpot.id, preview));
                url2.length && await dispatch(createSpotImagesThunk(newSpot.id, image2));
                url3.length && await dispatch(createSpotImagesThunk(newSpot.id, image3));
                url4.length && await dispatch(createSpotImagesThunk(newSpot.id, image4));
                url5.length && await dispatch(createSpotImagesThunk(newSpot.id, image5));
                // redirect to newly created spot
                history.push(`/spots/${newSpot.id}`);
            }


        }
    };

    return (
        <div className='create-spot-form-wrapper'>
            <div>
                {formType &&
                    <h2>Update Spot</h2>}
                {!formType &&
                    <h2>Create a new Spot</h2>}

                {/* <h2>Create a new Spot</h2> */}
                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they book a reservation.</p>
            </div>
            <form className='create-spot-form' onSubmit={handleSubmit}>



                <div>
                    <div className='country-text'>
                        <label>
                            Country &nbsp;
                        </label>
                        <div className='create-spot-errors'>
                            {hasSubmitted && errors.country && (
                                <p>{errors.country}</p>
                            )}
                        </div>
                    </div>
                    <input
                        className='create-spot-input'
                        type='text'
                        placeholder='Country'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    />
                </div>

                <div>
                    <div className='address-text'>
                        <label>
                            Street Address &nbsp;
                        </label>
                        <div className='create-spot-errors'>
                            {hasSubmitted && errors.address && (
                                <p>{errors.address}</p>
                            )}
                        </div>
                    </div>
                    <input
                        className='create-spot-input'
                        type='text'
                        placeholder='Address'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </div>

                <div className='city-and-state'>

                    <div className='create-spot-form-city'>
                        <div className='city-text'>
                            <label className='city-label'>
                                City &nbsp;
                            </label>
                            <div className='create-spot-errors'>
                                {hasSubmitted && errors.city && (
                                    <p>{errors.city}</p>
                                )}
                            </div>
                        </div>
                        <input
                            className='create-spot-input city'
                            type='text'
                            placeholder='City'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                    </div>

                    <div className='create-spot-form-comma'>
                        <br></br>
                        ,
                    </div>

                    <div className='create-spot-form-state'>
                        <div className='state-text'>
                            <label className='state-label'>
                                State
                            </label>
                            <div className='create-spot-errors'>
                                {hasSubmitted && errors.state && (
                                    <p>{errors.state}</p>
                                )}
                            </div>
                        </div>
                        <input
                            className='create-spot-input state'
                            type='text'
                            placeholder='STATE'
                            value={state}
                            onChange={e => setState(e.target.value)}
                        />

                    </div>
                </div>

                {/* <div>
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
                </div> */}

                <div className='description'>
                    <label>
                        <h2>Describe your place to guests</h2>
                        <p>Mention the best features of your space, any special amentities like
                            fast wifi or parking, and what you love about the neighborhood.</p>
                        <textarea
                            className='create-spot-input textarea'
                            placeholder='Please write at least 30 characters'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>
                    <div className='create-spot-errors'>
                        {hasSubmitted && errors.description && (
                            <p>{errors.description}</p>
                        )}
                    </div>
                </div>


                <div className='form-title'>
                    <label>
                        {formType && <h2>Update title for your spot</h2>}
                        {!formType && <h2>Create a title for your spot</h2>}
                        <p>Catch guests' attention with a spot title that highlights what makes
                            your place special.</p>
                        <input
                            className='create-spot-input'
                            type='text'
                            placeholder='Name of your spot'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div className='create-spot-errors'>
                    {hasSubmitted && errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>


                <div className='form-price'>
                    <label>
                        <h2>Set a base price for your spot</h2>
                        <p>Competitive pricing can help your listing stand out and rank higher
                            in search results</p>
                        <div className='price-line'>
                            $
                            <input
                                className='create-spot-input price'
                                type='number'
                                placeholder='Price per night (USD)'
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <div className='create-spot-errors'>
                        {hasSubmitted && errors.price && (
                            <p>{errors.price}</p>
                        )}
                    </div>
                </div>

                <div className='form-photos'>
                    <label>
                        <h2>Liven up your spot with photos</h2>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        <input
                            className='create-spot-input'
                            type='text'
                            placeholder='Preview Image URL'
                            value={previewImage}
                            onChange={e => setPreviewImage(e.target.value)}
                        />
                    </label>
                    <div className='create-spot-errors'>
                        {hasSubmitted && errors.previewImage && (
                            <p>{errors.previewImage}</p>
                        )}
                    </div>
                    <input
                        className='create-spot-input'
                        type='text'
                        placeholder='Image URL'
                        value={url2}
                        onChange={e => setUrl2(e.target.value)}
                    />
                    <div className='create-spot-errors'>
                        {hasSubmitted && errors.url2 && (
                            <p>{errors.url2}</p>
                        )}
                    </div>
                    <input
                        className='create-spot-input'
                        type='text'
                        placeholder='Image URL'
                        value={url3}
                        onChange={e => setUrl3(e.target.value)}
                    />
                    <div className='create-spot-errors'>
                        {hasSubmitted && errors.url3 && (
                            <p>{errors.url3}</p>
                        )}
                    </div>
                    <input
                        className='create-spot-input'
                        type='text'
                        placeholder='Image URL'
                        value={url4}
                        onChange={e => setUrl4(e.target.value)}
                    />
                    <div className='create-spot-errors'>
                        {hasSubmitted && errors.url4 && (
                            <p>{errors.url4}</p>
                        )}
                    </div>
                    <input
                        className='create-spot-input'
                        type='text'
                        placeholder='Image URL'
                        value={url5}
                        onChange={e => setUrl5(e.target.value)}
                    />
                    <div className='create-spot-errors'>
                        {hasSubmitted && errors.url5 && (
                            <p>{errors.url5}</p>
                        )}
                    </div>
                </div>

                <div>
                    <button className='create-spot-submit' type='submit'>
                        {formType && 'Update Spot'}
                        {!formType && 'Create Spot'}
                    </button>
                </div>

            </form>
        </div>
    )
}
