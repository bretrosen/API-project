const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res, next) => {
    const spotImage = await SpotImage.findByPk(req.params.imageId);
    const { user } = req;

    // error response for invalid spot image
    if (!spotImage) {
        res.status(404);
        return res.json({
            message: "Spot Image couldn't be found"
        });
    }

    const spot = await Spot.findByPk(spotImage.spotId);
    const owner = await User.findByPk(spot.ownerId);

    // error response for unauthorized user
    if (owner.id !== user.id) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        });
    }

    await spotImage.destroy();
    return res.json({
        message: "Successfully deleted"
    });
})

module.exports = router;
