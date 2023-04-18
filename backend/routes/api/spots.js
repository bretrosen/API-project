const express = require('express');
const { User, Spot, Review, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// validate fields for spot on creating spot
const validateSpot = [
    check('address')
        .exists({checkFalsy: true})
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true})
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .isLength({ max: 10})
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .isLength({ max: 10})
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50})
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors
];

// helper function to return spot data including average rating and preview image
const returnSpotData = async (spots) => {
    // create an array to push data for each spot to
    const spotsWithAvgAndPreview = [];

    for (let i = 0; i < spots.length; i++) {
        // create a manipulatable object for each spot
        const spotObj = spots[i].toJSON();
        // get the total number of reviews for each spot
        const reviewCount = await Review.count({
            where: { spotId: spotObj.id }
        });
        // get the sum of stars for all reviews for each spot
        const reviewSum = await Review.sum('stars', {
            where: { spotId: spotObj.id }
        });
        // get the average rating for each spot as a num to 1 decimal
        const avgRating = (reviewSum / reviewCount).toFixed(1);
        spotObj.avgRating = parseFloat(avgRating);

        // get the url for the preview image for each spot
        const imageUrl = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                spotId: spotObj.id,
                preview: true
            }
        });
        // convert the image url from an object to a string
        spotObj.previewImage = imageUrl.toJSON().url;

        // push all spot data, including rating and image url, to array
        spotsWithAvgAndPreview.push(spotObj);
    }

    // return array data nested inside an object
    return spotsWithAvgAndPreview;
}


// get details of all spots of the current user
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const spots = await Spot.findAll({
            where: {
                ownerId: user.id
            }
        });

        // get spot data with helper function and respond with it
        const spotData = await returnSpotData(spots);
        return res.json({ 'Spots': spotData });
})


// get details of a spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    // error response to return for invalid spotId
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        err.title = "Spot couldn't be found";
        return next(err);
    }

    const spotObj = spot.toJSON();

    // get the total number of reviews for the spot
    const reviewCount = await Review.count({
        where: { spotId: spotObj.id }
    });
    spotObj.numReviews = reviewCount;

    // get the sum of stars for all reviews for the spot
    const reviewSum = await Review.sum('stars', {
        where: { spotId: spotObj.id }
    });
    // get the average rating for each spot as a num to 1 decimal
    const avgRating = (reviewSum / reviewCount).toFixed(1);
    spotObj.avgStarRating = parseFloat(avgRating);

    // get all the images for the spot
    const spotImages = await SpotImage.findAll({
        attributes: ['id', 'url', 'preview'],
        where: {
            spotId: req.params.spotId
        }
    })

    // convert each image to a JSON object, push them to an array, and add the array as a value in the response
    const jsonSpotImages = [];
    spotImages.forEach(image => {
        jsonImage = image.toJSON();
        jsonSpotImages.push(jsonImage);
    })
    spotObj.SpotImages = jsonSpotImages;

    // get details for the owner of the spot
    const owner = await User.findByPk(spot.ownerId, {
        attributes: ['id', 'firstName', 'lastName']
    });

    // convert owner details to JSON and add to the response
    const jsonOwner = owner.toJSON();
    spotObj.Owner = jsonOwner;

    return res.json(spotObj);
})


// get details of all spots
router.get('/', async (_req, res) => {
    const spots = await Spot.findAll({
    });

    // get spot data from helper function and respond with it
    const spotData = await returnSpotData(spots);
    return res.json({ 'Spots': spotData });
})


// create a new spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price});

    res.statusCode = 201;
    return res.json(newSpot);
})

module.exports = router;
