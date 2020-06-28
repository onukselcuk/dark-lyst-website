const express = require("express");
const router = express.Router();
const axios = require("axios");
const { logger } = require("../../config/logger");

//* discover movie

router.get("/movie", async (req, res) => {
    try {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&include_adult=false`;
        const keysArray = Object.keys(req.query);

        keysArray.forEach((cur) => {
            url = `${url}&${cur}=${req.query[cur]}`;
        });

        const response = await axios.get(url);

        res.send(response.data);
    } catch (error) {
        logger.error(`/discover/movie route - Server Error:${error}`);
        res.send("something went wrong");
    }
});

router.get("/show", async (req, res) => {
    try {
        let url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&include_adult=false`;
        const keysArray = Object.keys(req.query);

        keysArray.forEach((cur) => {
            url = `${url}&${cur}=${req.query[cur]}`;
        });

        const response = await axios.get(url);

        res.send(response.data);
    } catch (error) {
        logger.error(`/discover/show route - Server Error:${error}`);
        res.send("something went wrong");
    }
});

module.exports = router;
