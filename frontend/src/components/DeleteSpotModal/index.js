import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from '../../store/spots';
import "./DeleteSpot.css";

const DeleteSpotModal = ({spotId}) => {
    const dispatch = useDispatch();
    // const [errors, setErrors] = useState('');
    const { closeModal } = useModal();
    console.log("spotId in delete modal", spotId);

    const handleClick = (event) => {
        event.preventDefault();
        return dispatch(deleteSpotThunk(spotId))
            .then(closeModal)
            // .catch(async (res) => {
            //     const data = await res.json();
            //     if (data && data.errors) setErrors(data.errors);
            // });
    };

    return (
        <div>
            <h1>Confirm Delete</h1>
            <h2>Are you sure you want to remove this spot from the listings?</h2>
            <button onClick={handleClick}>Yes (Delete Spot)</button>
            <button onClick={closeModal}>No (Keep Spot)</button>
        </div>
    )
}

export default DeleteSpotModal;
