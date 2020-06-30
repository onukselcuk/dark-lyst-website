const express = require("express");
const router = express.Router();
const axios = require("axios");
const redisClient = require("../../config/redis");
const { logger } = require("../../config/logger");
// const seedMovies = require("../../src/seedMovies");
// const seedTrendHero = require("../../src/seedTrendHero");

// * Get Latest Movies
router.get("/latest", async (req, res) => {
    try {
        const latestMoviesCache = await redisClient.get("latestMovies");
        if (latestMoviesCache) {
            return res.send(JSON.parse(latestMoviesCache));
        }
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}`;
        const result = await axios.get(url);
        redisClient.set("latestMovies", JSON.stringify(result.data));
        redisClient.expire("latestMovies", 43200);
        res.send(result.data);
    } catch (error) {
        logger.error(`/movies/latest route error: ${error}`);
    }
    //res.json(seedMovies);
});

//  Get Trending Movies for home page hero section
//  this route also handles if the video has high quality thumbnail using youtube api
//  this is only needed for homepage hero section,
router.get("/trending-hero", async (req, res) => {
    try {
        const trendingMoviesCache = await redisClient.get("trendingMovies");
        if (trendingMoviesCache) {
            return res.send(JSON.parse(trendingMoviesCache));
        }
        // get trending movies of the week
        const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`;
        let data = await axios.get(url);

        // take a slice of returned movies
        data = data.data.results.slice(0, 10);

        let i = 0;
        let newData = {};
        newData.results = [];

        //  for every movie get its videos
        while (i < data.length) {
            const movieVideoUrl = `https://api.themoviedb.org/3/movie/${data[i].id}/videos?api_key=${process.env.TMDB_API_KEY}`;

            //  for every movie get its videos
            const videoResult = await axios.get(movieVideoUrl);

            //  filter out videos that's not on youtube, also filter for trailer or teaser videos, clips etc not needed for hero section
            if (videoResult.data.results.length > 0) {
                let videoFilteredArr = videoResult.data.results.filter(
                    (videoObj) => {
                        return (
                            videoObj.type.toLowerCase() ===
                                ("trailer" || "teaser") &&
                            videoObj.site.toLowerCase() === "youtube"
                        );
                    }
                );

                let newVideoObj = {};

                //  combine keys of all videos for a single movie
                if (videoFilteredArr.length > 0) {
                    const videoKeys = videoFilteredArr.map((video) => {
                        return video.key;
                    });

                    const videoKeyString = videoKeys.join(",");
                    // send video keys to youtube api
                    const googleUrl = `https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_KEY}&part=snippet&id=${videoKeyString}`;

                    let newVideoResults = await axios.get(googleUrl);

                    newVideoResults = newVideoResults.data.items;

                    //  for every video result returned by youtube, find its index inside movies array and add maxres property indicating
                    //  if the video has max resolution thumbnail
                    videoFilteredArr = videoFilteredArr.map((current) => {
                        const index = newVideoResults.findIndex(
                            (now) => current.key === now.id
                        );

                        if (newVideoResults[index].snippet.thumbnails.maxres) {
                            return {
                                ...current,
                                maxres: true
                            };
                        } else {
                            return {
                                ...current,
                                maxres: false
                            };
                        }
                    });

                    newVideoObj = {
                        id: videoResult.data.id,
                        results: videoFilteredArr
                    };
                }

                const index = data.findIndex(
                    (cur) => cur.id === newVideoObj.id
                );
                const newObj = {
                    ...data[index],
                    video: true,
                    videos: newVideoObj.results
                };
                //  push new created object to an array
                newData.results.push(newObj);
            }

            i++;
        }

        // if at any point, if we have 5 results exit the process and return the results to frontend
        redisClient.set("trendingMovies", JSON.stringify(newData));
        redisClient.expire("trendingMovies", 86400);
        return res.send(newData);
    } catch (error) {
        logger.error(`/movies/trending-hero route error: ${error}`);
    }

    //res.json(seedTrendHero);
});

// * get top rated movies all by pagination
router.get("/top-rated", (req, res) => {
    const page = req.query.page;
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&page=${page}`;
    axios
        .get(url)
        .then((result) => {
            res.send(result.data);
        })
        .catch((error) => {
            logger.error(`/movies/top-rated route error: ${error}`);
        });
});

// * get now playing movies all by pagination
router.get("/now-playing", (req, res) => {
    const page = req.query.page;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&page=${page}`;

    axios
        .get(url)
        .then((result) => {
            res.send(result.data);
        })
        .catch((error) => {
            logger.error(`/movies/now-playing route error: ${error}`);
        });
});

// * get popular movies all by pagination
router.get("/popular", (req, res) => {
    const page = req.query.page;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&page=${page}`;
    axios
        .get(url)
        .then((result) => {
            res.send(result.data);
        })
        .catch((error) => {
            logger.error(`/movies/popular route error: ${error}`);
        });
});

// * get upcoming movies all by pagination
router.get("/upcoming", (req, res) => {
    const page = req.query.page;
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&page=${page}`;
    axios
        .get(url)
        .then((result) => {
            res.send(result.data);
        })
        .catch((error) => {
            logger.error(`/movies/upcoming route error: ${error}`);
        });
});

module.exports = router;
