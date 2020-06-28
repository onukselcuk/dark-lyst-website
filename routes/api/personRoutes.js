const express = require("express");
const router = express.Router();
const axios = require("axios");
const redisClient = require("../../config/redis");
const { logger } = require("../../config/logger");

//* get trending people
router.get("/trending", async (req, res) => {
    try {
        const trendingPeopleCache = await redisClient.get("trendingPeople");
        if (trendingPeopleCache) {
            return res.send(JSON.parse(trendingPeopleCache));
        }
        const url = `https://api.themoviedb.org/3/trending/person/day?api_key=${process.env.TMDB_API_KEY}`;
        const response = await axios.get(url);
        redisClient.set("trendingPeople", JSON.stringify(response.data));
        redisClient.expire("trendingPeople", 43200);
        res.send(response.data);
    } catch (error) {
        logger.error(`/person/trending route error: ${error}`);
    }
});

//* gets person details
router.get("/detail/:id", async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/person/${req.params.id}?api_key=${process.env.TMDB_API_KEY}`;

        const response = await axios.get(url);

        res.send(response.data);
    } catch (error) {
        logger.error(`/person/detail/${req.params.id} route error: ${error}`);
    }
});

//* gets tagged images of the person
router.get("/tagged-images/:id", async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/person/${req.params.id}/tagged_images?api_key=${process.env.TMDB_API_KEY}`;

        const response = await axios.get(url);

        res.send(response.data);
    } catch (error) {
        logger.error(
            `/person/tagged-images/${req.params.id} route error: ${error}`
        );
    }
});

//* gets combined credits of the person
router.get("/combined-credits/:id", async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/person/${req.params.id}/combined_credits?api_key=${process.env.TMDB_API_KEY}`;

        const response = await axios.get(url);

        res.send(response.data);
    } catch (error) {
        logger.error(
            `/person/combined-credits/${req.params.id} route error: ${error}`
        );
    }
});

module.exports = router;
