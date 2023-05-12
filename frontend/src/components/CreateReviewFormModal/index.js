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
    const [activeStars, setActiveStars] = useState(stars);

    let canSubmit = false;
    if (review.length >= 10 && stars >= 1) canSubmit = true;

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

    const onChange = (number) => {
        setStars(parseInt(number));
    };

    return (
        <div className='create-review-wrapper'>
            <h2>How was your stay?</h2>
            {errors.review && <p>{errors.review}</p>}
            <form onSubmit={handleSubmit}>
                <textarea className='review-text'
                    placeholder='Leave your review here...'
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />

                {/* <div>
                    <label>
                        <input
                            type='number'
                            value={stars}
                            onChange={e => setStars(e.target.value)}
                        />
                        Stars
                    </label>
                </div> */}

                <div className='rating-input'>
                    <div onMouseEnter={() => setActiveStars(1)}
                        onMouseLeave={() => setActiveStars(stars)}
                        onClick={() => onChange(1)}>
                        {activeStars < 1 &&
                            <i className='fa-regular fa-star fa-3x' />}
                        {activeStars >= 1 &&
                            <i className='fa-solid fa-star fa-3x' />}
                    </div>
                    <div onMouseEnter={() => setActiveStars(2)}
                        onMouseLeave={() => setActiveStars(stars)}
                        onClick={() => onChange(2)}>
                        {activeStars < 2 &&
                            <i className='fa-regular fa-star' />}
                        {activeStars >= 2 &&
                            <i className='fa-solid fa-star' />}
                    </div>
                    <div onMouseEnter={() => setActiveStars(3)}
                        onMouseLeave={() => setActiveStars(stars)}
                        onClick={() => onChange(3)}>
                        {activeStars < 3 &&
                            <i className='fa-regular fa-star' />}
                        {activeStars >= 3 &&
                            <i className='fa-solid fa-star' />}
                    </div>
                    <div onMouseEnter={() => setActiveStars(4)}
                        onMouseLeave={() => setActiveStars(stars)}
                        onClick={() => onChange(4)}>
                        {activeStars < 4 &&
                            <i className='fa-regular fa-star' />}
                        {activeStars >= 4 &&
                            <i className='fa-solid fa-star' />}
                    </div>
                    <div onMouseEnter={() => setActiveStars(5)}
                        onMouseLeave={() => setActiveStars(stars)}
                        onClick={() => onChange(5)}>
                        {activeStars < 5 &&
                            <i className='fa-regular fa-star' />}
                        {activeStars >= 5 &&
                            <i className='fa-solid fa-star' />}
                    </div>
                    <div className='stars-text'>
                        &nbsp;Stars
                    </div>
                </div>
                <button
                    className={canSubmit ? 'submit-review-button' : 'submit-review-button-disabled'}
                    type='submit'
                    disabled={!canSubmit}>
                    Submit Your Review
                </button>

            </form>
        </div>
    )
};

export default CreateReviewFormModal;
