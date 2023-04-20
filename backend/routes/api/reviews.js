const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// add an image to a review
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);
    const reviewId = req.params.reviewId;
    const { user } = req;

    // error response for invalid review
    if (!review) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found"
        })
    }

    // count review images for error handling
    const reviewImageCount= await ReviewImage.count({
        where: {reviewId: review.id}
    });

    // error response if 10 or more images exist for a review
    if (reviewImageCount >= 10) {
        res.status(403);
        return res.json({
            message: "Maximum number of images for this resource was reached"
        });
    }

    // error response if current user didn't write review
    if (review.userId !== user.id) {
        res.status(418);
        return res.json({
            message: "You didn't write this review! Hands off!"
        })
    }

    // create the new image for review and return it as the response body
    const { url } = req.body;
    const newImage = await ReviewImage.create({reviewId, url});
    return res.json({
        id: newImage.id,
        url: url
    });
})


// get all reviews of the current user
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;

    // query for reviews by user, including table and attributes as specified in documentation
    const reviews = await Review.findAll({
        where: { userId: user.id },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            {
                model: Spot, attributes:
                    ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
            },
            { model: ReviewImage, attributes: ['id', 'url'] }
        ]
    });

    // iterate over each review to add the previewImage property
    for (let i = 0; i < reviews.length; i++) {
        // find the correct spot image
        const previewImage = await SpotImage.findOne({
            where: {
                spotId: reviews[i].spotId,
                preview: true
            }
        });
        const url = previewImage.url;
        // set the preview image property on the Spot table included in the query
        reviews[i].Spot.dataValues.previewImage = url;
    }
    // format the response according to the documentation
    const reviewObj = {};
    reviewObj.Reviews = reviews;
    res.json(reviewObj);

})

module.exports = router;
