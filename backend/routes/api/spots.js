const express = require('express');
const {Spot, Review, SpotImage } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
    });

    const spotsWithAvgAndPreview = [];

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

        const imageUrl = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                spotId: spotObj.id,
                preview: true
            }
        });
        spotObj.previewImage = imageUrl.toJSON().url;

        spotsWithAvgAndPreview.push(spotObj);
    }

    // console.log(spotsWithAvgRating);

    return res.json({'Spots': spotsWithAvgAndPreview});
})

module.exports = router;
