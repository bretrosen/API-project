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

    useEffect(() => {
        const newErrors = {};
    })

}
