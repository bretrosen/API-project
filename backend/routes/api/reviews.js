const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// get all reviews of the current user
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;

    const reviewArray = [];
    const allReviewsObj = {};

    const reviews = await Review.findAll({
        where: { userId: user.id }
    });

    for (let i = 0; i < reviews.length; i++) {
        const reviewObj = reviews[i].toJSON();

        const user = await User.findByPk(reviewObj.userId, {
            attributes: ['id', 'firstName', 'lastName']
        });
        const jsonUser = user.toJSON();
        console.log(jsonUser);
        reviewObj.User = jsonUser;

        reviewArray.push(reviewObj);

        const spot = await Spot.findByPk(reviewObj.spotId, {
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
        });
        spotObj = spot.toJSON();

        const previewImage = await SpotImage.findOne({
            where: {
                spotId: reviewObj.spotId,
                preview: true
            }
        });

        const url = previewImage.dataValues.url;
        spotObj.previewImage = url;

        reviewArray.push(spotObj);



    }
    allReviewsObj.Reviews = reviewArray;
    // console.log(allReviewsObj);

    return res.json(allReviewsObj);

})

module.exports = router;
