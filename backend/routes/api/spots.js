const express = require('express');
const { Spot, Review, SpotImage } = require('../../db/models');

const router = express.Router();

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

router.get('/current', async (req, res) => {
    const { user } = req;

    if (user) {
        const spots = await Spot.findAll({
            where: {
                ownerId: user.id
            }
        });

        // get spot data with helper function and respond with it
        const spotData = await returnSpotData(spots);
        return res.json({ 'Spots': spotData });

        // respond with null if there isn't a logged-in user
    } else return res.json({ "Spots": null })
})

router.get('/', async (_req, res) => {
    const spots = await Spot.findAll({
    });

    // get spot data from helper function and respond with it
    const spotData = await returnSpotData(spots);
    return res.json({ 'Spots': spotData });
})

module.exports = router;
