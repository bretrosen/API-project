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
        <div>
            <h1>Confirm Delete</h1>
            <h2>Are you sure you want to delete this review?</h2>
            <button onClick={handleDelete}>Yes (Delete Review)</button>
            <button onClick={closeModal}>No (Keep Review)</button>
        </div>
    )
};

export default DeleteReviewModal;
