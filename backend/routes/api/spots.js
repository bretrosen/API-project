const express = require('express');
const {Spot, Review, ReviewImage } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll();

    return res.json(spots);
})

module.exports = router;
