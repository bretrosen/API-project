import React from "react";
// import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from '../../store/spots';
// import { getCurrentUserSpotsThunk } from '../../store/spots';
import "./DeleteSpot.css";

const DeleteSpotModal = ({ spotId }) => {
    // const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // dispatch the thunk to delete then close the modal
    // can a useEffect go here to update the manage spots page...
    const handleDelete = (event) => {
        // event.preventDefault();
        return dispatch(deleteSpotThunk(spotId))
            .then(closeModal);

        // dispatch(deleteSpotThunk(spotId));
        // closeModal();
        // history.push('/spots/current');


    };

    return (
        <div className='delete-spot-wrapper'>
            <h2 className='delete-spot-heading'>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button className='delete-spot-button' onClick={handleDelete}>Yes (Delete Spot)</button>
            <button className='keep-spot-button' onClick={closeModal}>No (Keep Spot)</button>
        </div>
    )
}

export default DeleteSpotModal;
