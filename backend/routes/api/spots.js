const express = require('express');
const { User, Spot, Review, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// validate fields for spot on creating spot
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({min: 5, max: 100})
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({min: 1, max: 30})
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({min: 1, max: 30})
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .isLength({min: 2, max: 30})
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .isLength({min: 4, max: 10})
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .isLength({min: 4, max: 10})
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({min: 5, max: 50})
        .withMessage("Name is required"),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({min: 10, max: 255})
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .isNumeric()
        .isLength({min: 2, max: 8})
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
        if (imageUrl) {
            spotObj.previewImage = imageUrl.toJSON().url;
        }
        // push all spot data, including rating and image url, to array
        spotsWithAvgAndPreview.push(spotObj);
    }

    // return array data nested inside an object
    return spotsWithAvgAndPreview;
}


// add a spot image based on the spot id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const { user } = req;

    // error response if current user doesn't own the spot
    if (spot.ownerId !== user.id) {
        res.status(403);
        return res.json({
            message: "You are not authorized to modify this Spot"
        })
    }

    // error response for invalid spot
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        });
    }

    // create a new spot image with spot id in request parameters
    const spotId = req.params.spotId;
    const { url, preview } = req.body;

    const newSpotImage = await SpotImage.create({ spotId, url, preview });

    // key into the object to respond with the data values
    return res.json({
        "id": parseInt(newSpotImage.dataValues.spotId),
        "url": newSpotImage.dataValues.url,
        "preview": newSpotImage.dataValues.preview
    });
})


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
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        });
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
router.post('/', requireAuth, validateSpot, async (req, res) => {
    // get the current user's id to use in creating the new spot
    const { user } = req;
    const ownerId = user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    console.log(ownerId);

    const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

    res.statusCode = 201;
    return res.json(newSpot);
})


// edit a spot
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const { user } = req;
    const ownerId = user.id;

    // error response for invalid spot
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        });
    }

    // error response if current user doesn't own the spot
    if (spot.ownerId !== user.id) {
        res.status(403);
        return res.json({
            message: "You are not authorized to modify this Spot"
        })
    }

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    // update the spot
    await spot.update({ ownerId, address, city, state, country, lat, lng, name, description, price });
    await spot.save();

    return res.json(spot);
})

module.exports = router;
