const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// validate fields for spot on creating spot
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 100 })
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 30 })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 30 })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .isLength({ min: 2, max: 30 })
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 20 })
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 20 })
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 50 })
        .withMessage("Name is required"),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 10, max: 255 })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .isNumeric()
        .isLength({ min: 2, max: 8 })
        .withMessage("Price per day is required"),
    handleValidationErrors
];

// validate fields for updating a spot
const validateUpdatedSpot = [
    check('address')
        .optional()
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 100 })
        .withMessage("Street address is required"),
    check('city')
        .optional()
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 30 })
        .withMessage("City is required"),
    check('state')
        .optional()
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 30 })
        .withMessage("State is required"),
    check('country')
        .optional()
        .exists({ checkFalsy: true })
        .isLength({ min: 2, max: 30 })
        .withMessage("Country is required"),
    check('lat')
        .optional()
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 20 })
        .withMessage("Latitude is not valid"),
    check('lng')
        .optional()
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 20 })
        .withMessage("Longitude is not valid"),
    check('name')
        .optional()
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 50 })
        .withMessage("Name is required"),
    check('description')
        .optional()
        .exists({ checkFalsy: true })
        .isLength({ min: 10, max: 255 })
        .withMessage("Description is required"),
    check('price')
        .optional()
        .exists({ checkFalsy: true })
        .isNumeric()
        .isLength({ min: 2, max: 8 })
        .withMessage("Price per day is required"),
    handleValidationErrors
]

// validate fields for creating a review
const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 255 })
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

// validate query filters
const validateQuery = [
    check('page')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage("Page must be greater than or equal to 1"),
    check('size')
        .optional()
        .isInt({ min: 1, max: 20 })
        .withMessage("Size must be greater than or equal to 1"),
    check('maxLat')
        .optional()
        .isFloat({ min: -90, max: 90})
        .withMessage("Maximum latitude is invalid"),
    check('minLat')
        .optional()
        .isFloat({ min: -90, max: 90})
        .withMessage("Minimum latitude is invalid"),
    check('minLng')
        .optional()
        .isFloat({ min: -180, max: 180})
        .withMessage("Maximum longitude is invalid"),
    check('maxLng')
        .optional()
        .isFloat({ min: -180, max: 180})
        .withMessage("Minimum longitude is invalid"),
    check('minPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Minimum price must be greater than or equal to 0"),
    check('maxPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors
]

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



// create review by spot id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const spotId = req.params.spotId;
    // check if user has a review for the spot
    const { user } = req;
    const userId = user.id;
    const userReview = await Review.findOne({
        where: {
            spotId: req.params.spotId,
            userId: user.id
        }
    });

    // error response for invalid spot
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        });
    }

    // error response if user has already reviewed the spot
    if (userReview) {
        res.status(500);
        return res.json({
            message: "User already has a review for this spot"
        });
    }

    // create the new review and return it as the response body
    const { review, stars } = req.body;
    const newReview = await Review.create({ spotId, userId, review, stars });
    return res.json(newReview);
})


// add a spot image based on the spot id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const { user } = req;

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

    // create a new spot image with spot id in request parameters
    const spotId = req.params.spotId;
    const { url, preview } = req.body;

    const newSpotImage = await SpotImage.create({ spotId, url, preview });

    // key into the object to respond with the data values
    return res.json({
        "id": newSpotImage.dataValues.id,
        "url": newSpotImage.dataValues.url,
        "preview": newSpotImage.dataValues.preview
    });
})


// create a booking by spot id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { user } = req;
    const userId = user.id;
    const spotId = parseInt(req.params.spotId);
    const spot = await Spot.findByPk(spotId);
    const { startDate, endDate } = req.body;

    // error response for invalid spot
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        });
    }

    // error response if current user attempts to book a spot they own
    if (spot.ownerId === userId) {
        res.status(418);
        return res.json({
            message: "You can't book your own spot"
        });
    }

    // convert request body params to times in millisecs for comparisons
    const objStartDate = new Date(startDate);
    const stringStartDate = objStartDate.toDateString();
    const objStringStartDate = new Date(stringStartDate);
    const timeStartDate = objStringStartDate.getTime();

    const objEndDate = new Date(endDate);
    const stringEndDate = objEndDate.toDateString();
    const objStringEndDate = new Date(stringEndDate);
    const timeEndDate = objStringEndDate.getTime();

    // error response if end date is on or before startDate
    if (timeEndDate <= timeStartDate) {
        res.status(400);
        return res.json({
            message: "Bad Request",
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        });
    }

    // get existing bookings for spot
    const bookings = await Booking.findAll({
        where: { spotId: spotId },
        attributes: ['startDate', 'endDate']
    });
    // check each booking for the spot for conflicts
    for (let i = 0; i < bookings.length; i++) {
        // convert existing start and end date to times for comparison
        const existingStart = bookings[i].dataValues.startDate;
        const stringExistingStart = existingStart.toDateString();
        const objStringExistingStart = new Date(stringExistingStart);
        const timeExistingStartDate = objStringExistingStart.getTime();

        const existingEnd = bookings[i].dataValues.endDate;
        const stringExistingEnd = existingEnd.toDateString();
        const objStringExistingEnd = new Date(stringExistingEnd);
        const timeExistingEndDate = objStringExistingEnd.getTime();

        // if the requested start date falls between an existing start date and an existing end date, return an error
        if (timeStartDate >= timeExistingStartDate && timeStartDate < timeExistingEndDate) {
            res.status(403);
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking"
                }
            });
        }

        // if the requested end date falls between an existing start date and an existing end date, return an error
        if (timeEndDate <= timeExistingEndDate && timeEndDate > timeExistingStartDate) {
            res.status(403);
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }

        // if the requested start date is before an existing start date and the requested end date is after an existing end date, return an error
        if (timeStartDate <= timeExistingStartDate && timeEndDate >= timeExistingEndDate) {
            res.status(403);
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
    }

    // create a new booking
    const newBooking = await Booking.create({ spotId, userId, startDate, endDate });
    return res.json(newBooking);
})


// get bookings by spot id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { user } = req;
    const spot = await Spot.findByPk(req.params.spotId);

    // error response for invalid spot
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        });
    }

    // query to return for spot owner
    if (user.id === spot.ownerId) {
        const ownerBookings = await Booking.findAll({
            where: { spotId: spot.id },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        });
        // format response according to documentation
        const ownerBookingsObj = {};
        ownerBookingsObj.Bookings = ownerBookings;
        return res.json(ownerBookingsObj);
    }

    // query to return for all other authenticated users
    const bookings = await Booking.findAll({
        where: { spotId: spot.id },
        attributes: ['spotId', 'startDate', 'endDate']
    });
    // format response according to documentation
    const bookingsObj = {};
    bookingsObj.Bookings = bookings;
    return res.json(bookingsObj);

})


// get reviews by spot id
router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    // error response for invalid spot
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        });
    }

    // query for all reviews of spot and include tables to match response in documentation
    const reviews = await Review.findAll({
        where: { spotId: spot.id },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: ReviewImage, attributes: ['id', 'url'] }
        ]
    });

    // format response to match documentation
    const reviewObj = {};
    reviewObj.Reviews = reviews;
    res.json(reviewObj);
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
router.get('/', validateQuery, async (req, res) => {
    // query object to build
    let query = { where: {} };
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    // import operator object for conditionals
    const { Op } = require('sequelize');

    // query options to add if passed as search parameters
    if (minLat) {
        query.where.lat = {[Op.gte]: minLat}
    }
    if (maxLat) {
        query.where.lat = {[Op.lte]: maxLat}
    }
    // modify query if multiple search options are selected for a column
    if (minLat && maxLat) {
        query.where.lat = {[Op.gte]: minLat, [Op.lte]: maxLat}
    }
    if (minLng) {
        query.where.lng = {[Op.gte]: minLng}
    }
    if (maxLng) {
        query.where.lng = {[Op.lte]: maxLng}
    }
    if (minLng && maxLng) {
        query.where.lng = {[Op.gte]: minLng, [Op.lte]: maxLng}
    }
    if (minPrice) {
        query.where.price = {[Op.gte]: minPrice}
    }
    if (maxPrice) {
        query.where.price = {[Op.lte]: maxPrice}
    }
    if (minPrice && maxPrice) {
        query.where.price = {[Op.gte]: minPrice, [Op.lte]: maxPrice}
    }

    // set pagination options
    if (!page) page = 1;
    if (!size) size = 20;
    if (page >= 1 && size >= 1) {
        query.limit = size;
        query.offset = size * (page - 1);
    }

    // get spots with search and pagination options
    const spots = await Spot.findAll(query);

    // get spot data from helper function and respond with it
    const spotData = await returnSpotData(spots);
    return res.json({
        'Spots': spotData,
        "page": page,
        "size": size
    });
})


// create a new spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    // get the current user's id to use in creating the new spot
    const { user } = req;
    const ownerId = user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    // console.log(ownerId);

    const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

    res.statusCode = 201;
    return res.json(newSpot);
})


// edit a spot
router.put('/:spotId', requireAuth, validateUpdatedSpot, async (req, res, next) => {
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


// delete a spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const { user } = req;

    // error response for invalid spot
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        });
    }
    // console.log(user.id);

    // error response if current user doesn't own the spot
    if (spot.ownerId !== user.id) {
        res.status(403);
        return res.json({
            message: "You are not authorized to modify this Spot"
        })
    }

    await spot.destroy();
    return res.json({ message: 'Successfully deleted' });
})

module.exports = router;
