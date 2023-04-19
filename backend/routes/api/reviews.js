const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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
