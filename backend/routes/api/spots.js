const express = require('express');
const {Spot, Review, SpotImage } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
    });

    const spotsWithAvgRating = [];

    for (let i = 0; i < spots.length; i++) {
        const spotObj = spots[i].toJSON();
        const reviewCount = await Review.count({
            where: {spotId: spotObj.id}
        });
        const reviewSum = await Review.sum('stars', {
            where: {spotId: spotObj.id}
        });
        const avgRating = (reviewSum / reviewCount).toFixed(1);
        spotObj.avgRating = parseFloat(avgRating);
        spotsWithAvgRating.push(spotObj);

        const imageUrl = await SpotImage.findByPk({
            attributes: ['url'],
            where: {}
        })
    }

    // console.log(spotsWithAvgRating);

    return res.json({'Spots': spotsWithAvgRating});
})

module.exports = router;
