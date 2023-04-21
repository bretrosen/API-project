const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId);
    const { user } = req;

    // error response for invalid review image
    if (!reviewImage) {
        res.status(404);
        return res.json({
            message: "Review Image couldn't be found"
        });
    }

    const review = await Review.findByPk(reviewImage.reviewId);

    // error response for unauthorized user
    if (review.userId !== user.id) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        });
    }

    await reviewImage.destroy();
    return res.json({
        message: "Successfully deleted"
    });
})

module.exports = router;
