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


// delete a booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    const { user } = req;

    // error response for invalid booking
    if (!booking) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found"
        });
    }

    const spot = await Spot.findByPk(booking.spotId);

    // delete if user owns booking or spot
    if (booking.userId === user.id || spot.ownerId === user.id) {
        // get times of start and end dates for comparison
        const timeStartDate = new Date(booking.startDate.toDateString()).getTime();
        const timeEndDate = new Date(booking.endDate.toDateString()).getTime();
        const timeNow = new Date().getTime();

        // error response for booking in progress
        if (timeStartDate <= timeNow && timeEndDate >= timeNow) {
            res.status(403);
            return res.json({
                message: "Bookings that have been started can't be deleted"
            })
        }

        await booking.destroy();
        return res.json({
            message: "Succesfully deleted"
        })
    }

    // error response if current user doesn't own the booking or spot
    res.status(418);
    return res.json({
        message: "Forbidden"
    })
})

// edit a booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { user } = req;
    const userId = user.id;
    const bookingId = parseInt(req.params.bookingId);
    const booking = await Booking.findByPk(bookingId);
    let { startDate, endDate } = req.body;

    // error response for invalid booking
    if (!booking) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found"
        })
    }

    // error response if user attempts to edit someone else's booking
    if (booking.userId !== userId) {
        res.status(418);
        return res.json({
            message: "Forbidden"
        })
    }

    // get a start date and an end date from either the original booking or the requested edits
    if (!startDate) startDate = booking.startDate;
    if (!endDate) endDate = booking.endDate;

    // convert start and end dates to times for comparisons
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

    // convert current date to time for comparison
    const dateNow = new Date();
    const stringDateNow = dateNow.toDateString();
    const objStringDateNow = new Date(stringDateNow);
    const timeDateNow = objStringDateNow.getTime();
    // error response if end date has already passed
    if (timeEndDate < timeDateNow) {
        res.status(403);
        return res.json({
            message: "Past bookings can't be modified"
        })
    }

    // get existing bookings for spot
    const spotId = booking.spotId;
    const bookings = await Booking.findAll({
        where: { spotId: spotId },
        attributes: ['id', 'startDate', 'endDate'],
    });


    const bookingsExceptEdited = [];
    // remove the booking to be edited from comparison against itself
    for (let booking of bookings) {
        if (booking.dataValues.id !== bookingId) {
            bookingsExceptEdited.push(booking);
        }
    }
    // check all bookings for the spot except the one to be edited for conflicts
    for (let i = 0; i < bookingsExceptEdited.length; i++) {
        // convert existing start and end date to times for comparison
        const existingStart = bookingsExceptEdited[i].dataValues.startDate;
        const stringExistingStart = existingStart.toDateString();
        const objStringExistingStart = new Date(stringExistingStart);
        const timeExistingStartDate = objStringExistingStart.getTime();

        const existingEnd = bookingsExceptEdited[i].dataValues.endDate;
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

    // update the booking
    await booking.update({
        startDate: startDate,
        endDate: endDate
    });
    await booking.save();

    return res.json(booking);
})
module.exports = router;
