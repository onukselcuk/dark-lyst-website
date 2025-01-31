const express = require("express");
const router = express.Router();
const axios = require("axios");
const logger = require("../../config/logger");

router.get("/multi/:keyword", async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
            req.params.keyword
        )}&api_key=${process.env.TMDB_API_KEY}&include_adult=false`;

        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        logger.error(
            `/search/multi/${req.params.keyword} route error: ${error}`
        );
        res.status(500).send("sorry can't find that");
    }
});

module.exports = router;
