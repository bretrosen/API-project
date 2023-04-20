const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// get all bookings of current user
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;

    // query for all bookings by user including associated spot data
    const bookings = await Booking.findAll({
        where: { userId: user.id },
        include: {
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
        }
    });

    // iterate over bookings to add the previewImage property
    for (let i = 0; i < bookings.length; i++) {
        // find the preview image
        const previewImage = await SpotImage.findOne({
            where: {
                spotId: bookings[i].spotId,
                preview: true
            }
        });
        const url = previewImage.url;
        // set preview image property on Spot values in the response
        bookings[i].Spot.dataValues.previewImage = url;
    }
    // format response according to documentation
    const bookingsObj = {};
    bookingsObj.Bookings = bookings;
    res.json(bookingsObj);
})

module.exports = router;
