const express = require("express");
const router = express.Router();
//const seedShows = require("../../src/seedShows");
const axios = require("axios");
const sub = require("date-fns/sub");
const format = require("date-fns/format");
const redisClient = require("../../config/redis");
const { logger } = require("../../config/logger");

// * get latest shows
router.get("/latest", async (req, res) => {
    try {
        const latestShowsCache = await redisClient.get("latestShows");
        if (latestShowsCache) {
            return res.send(JSON.parse(latestShowsCache));
        }
        const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}`;
        const result = await axios.get(url);
        redisClient.set("latestShows", JSON.stringify(result.data));
        redisClient.expire("latestShows", 43200);
        res.send(result.data);
    } catch (error) {
        logger.error(`/shows/latest route error: ${error}`);
    }
    //res.json(seedShows);
});

// * get latest netflix shows (aired in the last 6 months)
router.get("/netflix", async (req, res) => {
    const latestNetflixShowsCache = await redisClient.get("latestNetflixShows");
    if (latestNetflixShowsCache) {
        return res.send(JSON.parse(latestNetflixShowsCache));
    }
    try {
        let oldDate = sub(new Date(), { months: 6 });
        oldDate = format(oldDate, "yyyy-MM-dd");
        const today = format(new Date(), "yyyy-MM-dd");
        let url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&include_adult=false&air_date.lte=${today}&air_date.gte=${oldDate}&with_networks=213`;
        const response = await axios.get(url);
        redisClient.set("latestNetflixShows", JSON.stringify(response.data));
        redisClient.expire("latestNetflixShows", 43200);
        res.send(response.data);
    } catch (error) {
        logger.error(`/shows/netflix route error: ${error}`);
        res.send("something went wrong");
    }
});

// * get latest apple tv+ shows (aired in the last 6 months)
router.get("/apple", async (req, res) => {
    const latestAppleShowsCache = await redisClient.get("latestAppleShows");
    if (latestAppleShowsCache) {
        return res.send(JSON.parse(latestAppleShowsCache));
    }
    try {
        let oldDate = sub(new Date(), { months: 6 });
        oldDate = format(oldDate, "yyyy-MM-dd");
        const today = format(new Date(), "yyyy-MM-dd");
        let url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&include_adult=false&air_date.lte=${today}&air_date.gte=${oldDate}&with_networks=2552`;
        const response = await axios.get(url);
        redisClient.set("latestAppleShows", JSON.stringify(response.data));
        redisClient.expire("latestAppleShows", 43200);
        res.send(response.data);
    } catch (error) {
        logger.error(`/shows/apple route error: ${error}`);
        res.send("something went wrong");
    }
});

// * get top rated shows all by pagination
router.get("/top-rated", (req, res) => {
    const page = req.query.page;
    const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_API_KEY}&page=${page}`;
    axios
        .get(url)
        .then((result) => {
            res.send(result.data);
        })
        .catch((error) => {
            logger.error(`/shows/top-rated route error: ${error}`);
        });
});

// * get popular shows all by pagination
router.get("/popular", (req, res) => {
    const page = req.query.page;
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&page=${page}`;
    axios
        .get(url)
        .then((result) => {
            res.send(result.data);
        })
        .catch((error) => {
            logger.error(`/shows/popular route error: ${error}`);
        });
});

// * get on-air shows all by pagination
router.get("/on-the-air", (req, res) => {
    const page = req.query.page;
    const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}&page=${page}`;
    axios
        .get(url)
        .then((result) => {
            res.send(result.data);
        })
        .catch((error) => {
            logger.error(`/shows/on-the-air route error: ${error}`);
        });
});

// * get latest netflix shows (aired in the last 2 years)
router.get("/latest-on-netflix", async (req, res) => {
    const page = req.query.page;
    let oldDate = sub(new Date(), { years: 2 });
    oldDate = format(oldDate, "yyyy-MM-dd");
    const today = format(new Date(), "yyyy-MM-dd");

    try {
        let url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&include_adult=false&air_date.lte=${today}&air_date.gte=${oldDate}&with_networks=213&page=${page}`;

        const response = await axios.get(url);

        res.send(response.data);
    } catch (error) {
        logger.error(`/shows/latest-on-netflix route error: ${error}`);
        res.send("something went wrong");
    }
});

// * get latest apple-tv-plus shows (aired in the last 2 years)
router.get("/latest-on-apple-tv-plus", async (req, res) => {
    const page = req.query.page;
    let oldDate = sub(new Date(), { years: 2 });
    oldDate = format(oldDate, "yyyy-MM-dd");
    const today = format(new Date(), "yyyy-MM-dd");

    try {
        let url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&include_adult=false&air_date.lte=${today}&air_date.gte=${oldDate}&with_networks=2552&page=${page}`;

        const response = await axios.get(url);

        res.send(response.data);
    } catch (error) {
        logger.error(`/shows/latest-on-apple-tv-plus route error: ${error}`);
        res.send("something went wrong");
    }
});

module.exports = router;
