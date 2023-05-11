import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createReviewThunk } from '../../store/reviews';
import './CreateReviewFormModal.css';

const CreateReviewFormModal = ({ spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState({});

    let canSubmit = false;
    if (review.length >= 10 && stars >=1) canSubmit = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});
        return dispatch(createReviewThunk(spotId, { review, stars }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    return (
        <div>
            <h1>How was your stay?</h1>
            {errors.review && <p>{errors.review}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <textarea
                            placeholder='Leave your review here...'
                            rows='8'
                            cols='50'
                            value={review}
                            onChange={e => setReview(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type='number'
                            value={stars}
                            onChange={e => setStars(e.target.value)}
                        />
                        Stars
                    </label>
                </div>
                <button type='submit' disabled={!canSubmit}>Submit Your Review</button>
            </form>
        </div>
    )
};

export default CreateReviewFormModal;
