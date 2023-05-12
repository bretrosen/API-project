import React from 'react';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from '../../store/reviews';
import './DeleteReview.css';

const DeleteReviewModal = ({ reviewId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (event) => {
        event.preventDefault();
        return dispatch(deleteReviewThunk(reviewId))
            .then(closeModal);
    };

    return (
        <div className='delete-review-wrapper'>
            <h2 className='delete-review-heading'>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <button className='delete-review-button' onClick={handleDelete}>Yes (Delete Review)</button>
            <button className='keep-review-button' onClick={closeModal}>No (Keep Review)</button>
        </div>
    )
};

export default DeleteReviewModal;
